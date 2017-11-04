package com.loremachine.tools;

import java.util.Comparator;

import org.json.simple.JSONObject;

public class JSONComparator implements Comparator<JSONObject> {
	
	@Override
	public int compare(JSONObject a, JSONObject b) {
		if (a.containsKey("name") && b.containsKey("name"))
			return ((String) a.get("name")).compareTo((String) b.get("name"));
		return 0;
	}
}
