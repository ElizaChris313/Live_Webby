#!/usr/bin/env python3
"""
CSV to JSON Converter for Theatre Portfolio
Converts credits.csv to experience.json
No libraries needed!
"""

import csv
import json
from datetime import datetime

def clean_value(value):
    """Clean and format cell values."""
    if not value:
        return ""
    
    value = str(value).strip()
    
    # Handle date formatting if it contains timestamp
    if '00:00:00' in value:
        try:
            date_obj = datetime.strptime(value, '%Y-%m-%d %H:%M:%S')
            return date_obj.strftime('%Y-%m-%d')
        except:
            pass
    
    return value

def main():
    input_file = "credits.csv"
    output_file = "experience.json"
    
    print(f"Reading {input_file}...")
    
    experience_list = []
    
    with open(input_file, 'r', encoding='cp1252', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        
        # Print headers to see what columns you have
        if reader.fieldnames:
            print("Columns found:", reader.fieldnames)
        
        for idx, row in enumerate(reader, start=1):
            # Skip rows without a show name
            show_name = clean_value(row.get('Show', ''))
            if not show_name:
                continue
            
            # Create the experience entry
            experience = {
                "id": idx,
                "show": show_name,
                "producingCompany": clean_value(row.get('Producing Company', '')),
                "venue": clean_value(row.get('venue', '')),
                "role": clean_value(row.get('Role', '')),
                "startDate": clean_value(row.get('Start Date', '')),
                "endDate": clean_value(row.get('End Date', '')),
                "location": clean_value(row.get('Location', '')),
                "basicCredits": {
                    "director": clean_value(row.get('Director', '')),
                    "writer": clean_value(row.get('Writer', ''))
                },
                "fullCredits": {
                    "associateDirector": clean_value(row.get('Associate Director', '')),
                    "additionalWriter": clean_value(row.get('Writer1', '')),
                    "setBy": clean_value(row.get('Set by', '')),
                    "costumesBy": clean_value(row.get('Costumes by', '')),
                    "videoBy": clean_value(row.get('Video by', '')),
                    "lightingBy": clean_value(row.get('Lighting by', '')),
                    "soundBy": clean_value(row.get('Sound by', '')),
                    "producedBy": clean_value(row.get('Produced by', '')),
                    "productionManagedBy": clean_value(row.get('Production Managed by', '')),
                    "technicalDirectionBy": clean_value(row.get('Technical Direction by', '')),
                    "starring1": clean_value(row.get('Starring1', '')),
                    "starring2": clean_value(row.get('Starring2', '')),
                    "starring3": clean_value(row.get('Starring3', '')),
                    "starring4": clean_value(row.get('Starring4', '')),
                    "starring5": clean_value(row.get('Starring5', '')),
                    "starring6": clean_value(row.get('Starring6', ''))
                }
            }
            
            experience_list.append(experience)
    
    json_data = {"experience": experience_list}
    
    print(f"Writing {len(experience_list)} entries to {output_file}...")
    
    with open(output_file, 'w', encoding='utf-8') as jsonfile:
        json.dump(json_data, jsonfile, indent=2, ensure_ascii=False)
    
    print("Done!")

if __name__ == "__main__":
    main()