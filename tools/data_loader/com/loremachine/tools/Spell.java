package com.loremachine.tools;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Scanner;
import org.json.simple.*;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;;

public class Spell {
	
	// Field to count and uniquely ID all the spells we read in
	private static int idMarker = 0;
	private static HashMap<String, JSONObject> jsonSpellData = new HashMap<String, JSONObject>();
	
	private int id;
	private String name;
	private JSONArray level;
	private String school;
	private String type;
	private String casting_time;
	private String components;
	private String range;
	private String effect;
	private String duration;
	private String saving_throw;
	private String spell_resistance;
	private String description;
	private String url;
	
	
	public Spell(HashMap<String, String> tags) {
		this.name = tags.get("NAME");
		if (this.name.contains("(")) {
			int idx = this.name.indexOf('(');
			if (idx > 2) {
				String altName = this.name.substring(0, idx - 1)
						+ ", " + this.name.substring(idx).replace("(", "").replace(")", "");
				this.name = altName;
			}
		}
		
		JSONObject obj = jsonSpellData.get(this.name.toLowerCase());
		this.id = idMarker++;
		this.level = (JSONArray) obj.get("levels");
		cleanUpClassLevels(this.level);
		this.school = DataExtractor.stringPurifier(tags.get("SCHOOL"));
		this.type = DataExtractor.stringPurifier(tags.get("TYPE").replaceAll("[.]", " & "));
		this.casting_time = DataExtractor.stringPurifier(tags.get("CASTTIME"));
		this.components = (String) obj.get("component_text");
		if (this.components == null) {
			this.components = DataExtractor.stringPurifier(tags.get("COMPS"));
		}
		this.range = DataExtractor.stringPurifier(tags.get("RANGE"));
		this.effect = DataExtractor.stringPurifier(tags.get("TARGETAREA"));
		this.duration = (String) obj.get("duration");
		if (this.duration == null) {
			this.duration = DataExtractor.stringPurifier(tags.get("DURATION"));
			this.duration = this.duration.replaceAll("CASTERLEVEL", "caster level");
		}
		this.saving_throw = (String) obj.get("saving_throw");
		this.spell_resistance = DataExtractor.stringPurifier(tags.get("SPELLRES"));
		this.url = tags.get("SOURCELINK");
		this.setDesc(tags.get("DESC"));
	}
	
	
	/**
	 * A helper for processing spell level requirements.
	 * 
	 * @param fromFile String from file containing class/level info.
	 * @return A hash map containing class names mapped to levels.
	 */
	private JSONArray getLevels(String fromFile) {
		JSONArray ret = new JSONArray();
		String[] levels = fromFile.split("[|]");
		for (String level : levels) {
			int intLevel = Integer.parseInt(level.substring(level.indexOf('=') + 1));
			String[] classes = level.split(",");
			for (String clazz : classes) {
				if (clazz.indexOf('=') != -1)
					clazz = clazz.substring(0, clazz.indexOf('='));
				
				JSONObject entry = new JSONObject();
				entry.put("clazz", clazz);
				entry.put("level", new Integer(intLevel));
				ret.add(entry);
			}
		}
		return ret;
	}
	
	private static void cleanUpClassLevels(JSONArray a) {
		for (Object lie : a) {
			JSONObject truth = (JSONObject) lie;
			truth.put("clazz", truth.get("class"));
			truth.remove("class");
		}
	}
	
	
	/**
	 * Setter to clean up description string before setting it.
	 * 
	 * @param newDesc New description to check and set.
	 */
	private void setDesc(String newDesc) {
		if (newDesc.indexOf('|') != -1)
			newDesc = newDesc.substring(0, newDesc.indexOf('|'));
		newDesc = DataExtractor.stringPurifier(newDesc);
		this.description = newDesc;
	}
	
	
	/**
	 * This will turn this object into a JSON object.
	 * 
	 * @return This in JSON form.
	 */
	@SuppressWarnings("unchecked")
	protected JSONObject toJSON() {
		
		/*JSONArray classLevels = new JSONArray();
		for (String clazz : this.level.keySet()) {
			JSONObject arrayObject = new JSONObject();
			arrayObject.put(clazz, this.level.get(clazz));
			classLevels.add(arrayObject);
		}*/
		
		JSONObject obj = new JSONObject();
		obj.put("id", this.id);
		obj.put("name", this.name);
		obj.put("level", this.level);
		obj.put("school", this.school);
		obj.put("type", this.type);
		obj.put("casting_time", this.casting_time);
		obj.put("components", this.components);
		obj.put("range", this.range);
		obj.put("effect", this.effect);
		obj.put("duration", this.duration);
		obj.put("saving_throw", this.saving_throw);
		obj.put("spell_resistance", this.spell_resistance);
		obj.put("description", this.description);
		obj.put("url", this.url);
		
		return obj;
	}
	
	
	/** Create a string to represent this spell */
	@Override
	public String toString() {
		return "ID: " + this.id + "\n"
			 + "NAME: " + this.name + "\n"
			 + "LEVEL: " + this.level.toJSONString() + "\n"
			 + "SCHOOL: " + this.school + "\n"
			 + "TYPE: " + this.type + "\n"
			 + "CASTING TIME: " + this.casting_time + "\n"
			 + "COMPONENTS: " + this.components + "\n"
			 + "RANGE: " + this.range + "\n"
			 + "EFFECT: " + this.effect + "\n"
			 + "DURATION: " + this.duration + "\n"
			 + "SAVING THROW: " + this.saving_throw + "\n"
			 + "SPELL RESISTANCE: " + this.spell_resistance + "\n"
			 + "DESC: " + this.description + "\n"
			 + "URL: " + this.url + "\n";
	}
	
	
	/**
     * This will process a list of data files and write them all out to JS spell files.
     * 
     * This expects two "sections" for a given spell data file.
     * A "<data>" section for all the spell data to map in and create a spell object.
     * An optional "<desc>" section for longer descriptions, because thats how its set in the PC gen data file so yeah.
     * @param files A list of files to process.
     */
    protected static void processSpells(HashSet<File> files) {
    	
    	// Load JSON data from PSRD
    	File psrdDir = new File("./input/PSRD-json-spells");
    	JSONParser parser = new JSONParser();
    	
    	if (psrdDir.exists() && psrdDir.isDirectory()) {
    		for (File f : psrdDir.listFiles()) {
    			try {
	    			if (!f.getName().endsWith(".json"))
	    				continue;
	    			JSONObject o = (JSONObject) parser.parse(new FileReader(f));
	    			jsonSpellData.put(((String) o.get("name")).toLowerCase(), o);
    			} catch (IOException | ParseException e) {
    				e.printStackTrace();
    			}
    		}
    	}
    	
    	// Go through all the files and process them
    	for (File f: files) {
    		// Create a map for spell names to spell objects
        	HashMap<String, Spell> spells = new HashMap<String, Spell>();
        	
    		// Surround everything in a big try-catch because fuck it
    		try (Scanner fScan = new Scanner(f)) {
    			
    			// A bool flag for which section of the file we are in
    			boolean makingNewSpells = true;
    			// Scan through file lines
    			while (fScan.hasNextLine()) {
    				
    				// Check for section tags
    				String line = fScan.nextLine();
    				if (line.matches("<.*>*")) {
    					if (line.equals("<desc>"))
    						makingNewSpells = false;
    					continue;
    				}
    				
    				// Ignore empty lines
    				if (line.length() == 0)
    					continue;
    				
    				// Make a new spell if are not in the "<desc>" section
    				if (makingNewSpells) {
    					Spell s = new Spell(DataExtractor.tokenator("NAME", line));
    					spells.put(s.name, s);
    				}
    				// Read in long descriptions
    				else {
    					HashMap<String, String> tagMap = DataExtractor.tokenator("NAME", line);
    					String spellName = tagMap.get("NAME");
    					String fixedName = spellName.substring(0, spellName.indexOf(".MOD"));
    					try {
	    					if (spells.containsKey(fixedName)) {
	    						spells.get(fixedName).setDesc(tagMap.get("DESC"));
	    						spells.get(fixedName).toString();
	    					}
    					} catch (NullPointerException e) {
    						System.out.println(fixedName);
    						e.printStackTrace();
    						System.exit(1);
    					}
    				}
    			}
    			
    			// Turn the map into a list of JSON objects
    	    	LinkedList<JSONObject> jsonSpells = new LinkedList<JSONObject>();
    	    	for (Spell s : spells.values())
    	    		jsonSpells.add(s.toJSON());
    	    	// Sort them because reasons
    	    	jsonSpells.sort(new JSONComparator());
    	    	
    	    	// Write to file
    	    	DataExtractor.generateFiles(DataExtractor.getFileTitle(f.getName()), DataExtractor.getDataTitle(f.getName()), jsonSpells);
    		}
    		catch (FileNotFoundException e) { e.printStackTrace(); }
    	}
    	
    	
    }
}
