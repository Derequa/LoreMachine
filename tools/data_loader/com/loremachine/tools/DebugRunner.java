package com.loremachine.tools;

public class DebugRunner {

	public static void main(String[] args) {
		if (args.length != 0)
			DataExtractor.main(args);
		else {
			String[] debugArgs = {"spells"};
			DataExtractor.main(debugArgs);
		}
	}
}
