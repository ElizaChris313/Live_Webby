import os
import json

# Configuration - CHANGE THESE VALUES
PARENT_FOLDER = "LX_Photos"  # The folder name to prepend to all image paths
IMAGE_DIR = "Lighting Photos"  # The directory containing your images
OUTPUT_FILE = "gallery_data.json"

# Get all image files
image_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp')
image_files = []

for root, dirs, files in os.walk(IMAGE_DIR):
    for file in files:
        if file.lower().endswith(image_extensions):
            rel_path = os.path.relpath(os.path.join(root, file), IMAGE_DIR)
            image_files.append(rel_path)

# Sort files
image_files.sort()

# Create gallery data
gallery_data = []
for idx, img_path in enumerate(image_files, start=1):
    gallery_data.append({
        "id": idx,
        "category": "CATEGORY_HERE",  # You'll edit this
        "title": os.path.basename(img_path),
        "venue": "VENUE_HERE",  # You'll edit this
        "image": f"{PARENT_FOLDER}/{img_path.replace('\\', '/')}",  # Parent folder added here
        "alt": "ALT_TEXT_HERE"  # You'll edit this
    })

# Save to file
with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    json.dump(gallery_data, f, indent=2, ensure_ascii=False)

print(f"✅ Created {len(gallery_data)} entries")
print(f"💾 Saved to: {OUTPUT_FILE}")
print(f"📁 Image paths format: {PARENT_FOLDER}/[subfolders]/image.jpg")