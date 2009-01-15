package com.oculi.webtest;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.Window;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class Main extends Activity {
	
	private class MyJavaAPI {
		public void log(String s) {
			Log.e("JAVASCRIPT", s);
		}
	}
	
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        
        try {
        	String html = readAsset("golfdroid/new.html");
        	
	        WebView wv = new WebView(this);
	        wv.getSettings().setJavaScriptEnabled(true);
	        wv.addJavascriptInterface(new MyJavaAPI(), "java");
	        
	        setContentView(wv);
	        
	        wv.loadDataWithBaseURL("file:///android_asset/", html, "text/html", "UTF-8", null);
        } catch (IOException e) {
        	e.printStackTrace();
        }
    }
    
    private String readAsset(String fileName) throws IOException {
    	StringBuilder ret = new StringBuilder();
    	BufferedReader buff = new BufferedReader(new InputStreamReader(this.getAssets().open(fileName)));
    	String line;
    	while ((line = buff.readLine()) != null)
    		ret.append(line);
    	return ret.toString();
    }
}