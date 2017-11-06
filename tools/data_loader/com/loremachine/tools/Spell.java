package com.loremachine.tools;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Scanner;
import org.json.simple.*;

public class Spell {
	
	private static int idMarker = 0;

	private int id;
	private String name;
	private HashMap<String, Integer> level;
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
		this.id = idMarker++;
		this.name = DataExtractor.stringPurifier(tags.get("NAME"));
		this.level = getLevels(tags.get("CLASSES"));
		this.school = DataExtractor.stringPurifier(tags.get("SCHOOL"));
		this.type = DataExtractor.stringPurifier(tags.get("TYPE").replaceAll("[.]", " & "));
		this.casting_time = DataExtractor.stringPurifier(tags.get("CASTTIME"));
		this.components = DataExtractor.stringPurifier(tags.get("COMPS"));
		this.range = DataExtractor.stringPurifier(tags.get("RANGE"));
		this.effect = DataExtractor.stringPurifier(tags.get("TARGETAREA"));
		this.duration = DataExtractor.stringPurifier(tags.get("DURATION"));
		this.saving_throw = DataExtractor.stringPurifier(tags.get("SAVEINFO"));
		this.spell_resistance = DataExtractor.stringPurifier(tags.get("SPELLRES"));
		this.url = tags.get("SOURCELINK");
		this.setDesc(tags.get("DESC"));
	}
	
	private HashMap<String, Integer> getLevels(String fromFile) {
		HashMap<String, Integer> ret = new HashMap<String, Integer>();
		String[] levels = fromFile.split("[|]");
		for (String level : levels) {
			int intLevel = Integer.parseInt(level.substring(level.indexOf('=') + 1));
			String[] classes = level.split(",");
			for (String clazz : classes) {
				if (clazz.indexOf('=') != -1)
					clazz = clazz.substring(0, clazz.indexOf('='));
				ret.put(clazz, new Integer(intLevel));
			}
		}
		return ret;
	}
	
	protected String getName() {
		return this.name;
	}
	
	protected void setDesc(String newDesc) {
		if (newDesc.indexOf('|') != -1)
			newDesc = newDesc.substring(0, newDesc.indexOf('|'));
		newDesc = DataExtractor.stringPurifier(newDesc);
		this.description = newDesc;
	}
	
	protected JSONObject toJSON() {
		JSONArray classLevels = new JSONArray();
		for (String clazz : this.level.keySet()) {
			JSONObject arrayObject = new JSONObject();
			arrayObject.put(clazz, this.level.get(clazz));
			classLevels.add(arrayObject);
		}
		
		JSONObject obj = new JSONObject();
		obj.put("id", this.id);
		obj.put("name", this.name);
		obj.put("level", classLevels);
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
	
	public String toString() {
		return "ID: " + this.id + "\n"
			 + "NAME: " + this.name + "\n"
			 + "LEVEL: " + DataExtractor.stringifyMap(this.level) + "\n"
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
     * 
     * @param files
     */
    protected static void processSpells(HashSet<File> files) {
    	HashMap<String, Spell> spells = new HashMap<String, Spell>();
    	for (File f: files) {
    		try (Scanner fScan = new Scanner(f)) {
    			boolean makingNewSpells = true;
    			while (fScan.hasNextLine()) {
    				String line = fScan.nextLine();
    				if (line.matches("<.*>*")) {
    					if (line.equals("<desc>"))
    						makingNewSpells = false;
    					continue;
    				}
    				if (line.length() == 0)
    					continue;
    				if (makingNewSpells) {
    					Spell s = new Spell(DataExtractor.tokenator("NAME", line));
    					spells.put(s.getName(), s);
    				}
    				else {
    					HashMap<String, String> tagMap = DataExtractor.tokenator("NAME", line);
    					String spellName = tagMap.get("NAME");
    					String fixedName = spellName.substring(0, spellName.indexOf(".MOD"));
    					if (spells.containsKey(fixedName)) {
    						spells.get(fixedName).setDesc(tagMap.get("DESC"));
    						spells.get(fixedName).toString();
    					}
    				}
    			}
    		} catch (FileNotFoundException e) {
    			e.printStackTrace();
    		}
    	}
    	LinkedList<JSONObject> jsonSpells = new LinkedList<JSONObject>();
    	for (Spell s : spells.values())
    		jsonSpells.add(s.toJSON());
    	jsonSpells.sort(new JSONComparator());
    	DataExtractor.generateFiles("Spells", "spells", jsonSpells);
    }
}
