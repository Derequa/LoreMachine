package com.loremachine.tools;
import java.io.*;
import java.text.Normalizer;
import java.text.Normalizer.Form;
import java.util.*;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class DataExtractor {

    private static final String TAB = "    ";
    private static int tabLevel = 0;

    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("No mode given!");
            System.exit(1);
        }

        HashSet<File> files = loadLists(args[0] + "-");
        switch(args[0]) {
            case "spells":
                processSpells(files);
                break;
            default:
                break;
        }
    }

    private static void processSpells(HashSet<File> files) {
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
    					Spell s = new Spell(tokenator("NAME", line));
    					spells.put(s.getName(), s);
    				}
    				else {
    					HashMap<String, String> tagMap = tokenator("NAME", line);
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
    	generateFile("output/Spells.js", "spells", jsonSpells);
    }
    
    private static void generateFile(String filename, String dataTitle, List<JSONObject> data) {
    	String preamble = "// Data scraped from PC gen's data files. All credit for hauling in this data goes to the PC gen team: http://pcgen.org/";
    	String idContents =  "export const " + dataTitle + "_ids = {\n";
    	String dataContents = "export const " + dataTitle + "_data = \n[";
    	tabLevel = 1;
    	for (JSONObject o : data) {
    		if (o.get("id") == null || o.get("name") == null)
    			continue;
    		int id = (Integer) o.get("id");
    		String name = nameify((String) o.get("name"));
    		idContents += TAB + name + ": " + id + ",\n";
    		
    		dataContents += stringifyObject(o, dataTitle) + ",";
    	}
    	idContents += "}\n";
    	dataContents += "\n]\n";
    	
    	File f = new File(filename);
    	if (!f.exists()) {
			try {
				f.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
    	}
    	try (FileWriter fw = new FileWriter(f)) {
    		fw.write(preamble + "\n\n" + idContents + "\n\n" + dataContents + "\n\n");
    	} catch (IOException e) {
    		e.printStackTrace();
    	}
    }
    
    private static String stringifyObject(JSONObject o, String dataTitle) {
    	String ret = "";
    	ret += getTab() + "\n" + getTab() + "{\n";
    	tabLevel++;
    	for (Object field : o.keySet()) {
    		if (field instanceof String && field.equals("id")) {
    			if (o.get("name") != null) {
    				ret += getTab() + "id: " + dataTitle + "_ids." + nameify((String)o.get("name")) + ",\n";
    			}
    		}
    		else {
    			Object value = o.get(field);
    			ret += getTab() + field + ": ";
    			if (value instanceof JSONObject)
    				ret += stringifyObject((JSONObject) value, dataTitle) + ",\n";
    			else if (value instanceof JSONArray)
    				ret += stringifyArray((JSONArray) value, dataTitle) + ",\n";
    			else if (value instanceof String)
    				ret += "\'" + value + "\',\n";
    			else
    				ret += value + ",\n";
    		}
     	}
    	tabLevel--;
		ret += getTab() + "}";
		return ret;
    }
    
    private static String stringifyArray(JSONArray a, String dataTitle) {
    	String ret = "";
    	ret += "\n" + getTab() + "[";
    	tabLevel++;
    	for (Object item : a) {
			ret += getTab();
			if (item instanceof JSONObject)
				ret += stringifyObject((JSONObject) item, dataTitle) + ",\n";
			else if (item instanceof JSONArray)
				ret += stringifyArray((JSONArray) item, dataTitle) + ",\n";
			else if (item instanceof String)
				ret += "\'" + item + "\',\n";
			else
				ret += item + ",\n";
     	}
    	tabLevel--;
    	ret += getTab() + "]";
    	return ret;
    }
    
    private static String getTab() {
    	String ret = "";
    	for (int i = 0 ; i < tabLevel ; i++) {
    		ret += TAB;
    	}
    	return ret;
    }
    
    private static String nameify(String name) {
    	return Normalizer.normalize(name, Form.NFD)
				.toLowerCase()
				.replaceAll(" ", "_")
				.replaceAll("[^A-Za-z0-9_]", "");
    }

    /**
     * This will load and pre-process all files in the input directory with the
     * given prefix.
     * @param prefix The prefix of the files we should load in.
     * @return A set of all the pre-processed files we found.
     */
    private static HashSet<File> loadLists(String prefix) {
        HashSet<File> inputFiles = new HashSet<File>();
        File inputDir = new File("input");
        if (!inputDir.isDirectory())
            return null;
        for (File f : inputDir.listFiles()) {
            if (f.getName().startsWith(prefix)) {
                inputFiles.add(preProcess(f));
            }
        }
        return inputFiles;
    }

    /**
     * A quick way of pre-processing the file before we pull data from it.
     * This will remove various types of comments from the file, and write a new one in
     * the current directory with a .proc extension.
     * @param f The file we are pre-processing.
     * @return The pre-processed file.
     */
    private static File preProcess(File f) {
        // .proc file contents
        String newFile = "";
        // Scan in file line by line
        try (Scanner fScan = new Scanner(f)) {
            boolean isInBlock = false;
            while (fScan.hasNextLine()) {
                String line = fScan.nextLine();
                // Check if we are in a block comment
                if (isInBlock) {
                    // Signal block end
                    if (line.startsWith("*/"))
                        isInBlock = false;
                    // Otherwise eat the line
                    continue;
                }
                // Look for block comment start, signal it and eat the line
                else if (line.startsWith("/*")) {
                    isInBlock = true;
                    continue;
                }
                // Look for line comment start and eat the line
                else if (line.startsWith("#")) {
                    continue;
                }
                // Otherwise add the contents for the line
                else {
                    newFile += line + "\n";
                }
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        // Write .proc file
        File ret = new File(f.getName() + ".proc");
        try (FileWriter writer  = new FileWriter(ret)) {
            writer.write(newFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ret;
    }
    
    protected static HashMap<String, String> tokenator(String firstTokenID, String fileLine) {
    	Scanner s = new Scanner(fileLine);
		HashMap<String, String> tagMap = new HashMap<String, String>();
		String token = "";
		String currentTokenName = firstTokenID;
		String currentTokenData = null;
		// Read in spell name
		while (s.hasNext()) {
			token = s.next();
			if (token.matches("[A-Z]*:.*")) {
				tagMap.put(currentTokenName, currentTokenData);
				currentTokenName = token.substring(0, token.indexOf(':'));
				currentTokenData = token.substring(token.indexOf(':') + 1);
			}
			else {
				if (currentTokenData != null)
					currentTokenData += " " + token;
				else
					currentTokenData = token;
			}
		}
		s.close();
		tagMap.put(currentTokenName, currentTokenData);
		return tagMap;
    }
    
    protected static String stringPurifier(String gross) {
    	if (gross != null && gross.length() > 0)
    		return gross.replace("'", "\\'").replace("\"", "\\\"");
    	else
    		return gross;
    }
    
    protected static String stringifyMap(HashMap<?, ?> map) {
    	String ret = "";
		for (Object key : map.keySet()) {
			ret += key.toString() + " : " + map.get(key).toString() + "\n";
		}
		return ret;
	}
    
}
