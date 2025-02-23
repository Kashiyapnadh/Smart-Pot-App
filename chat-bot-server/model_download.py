import os
import requests
import zipfile
from tqdm import tqdm

# Dropbox direct download link (change dl=0 to dl=1)
url = "https://www.dropbox.com/scl/fi/i24ynlitlbiheegeil9gz/saved_model.zip?rlkey=yt7we1qxber38611huwas9b88&st=a9kbi974&dl=1"
file_name = "downloaded_file.zip"

# Check if the ZIP file already exists
if os.path.exists(file_name):
    print(f"'{file_name}' already exists. Skipping download.")
else:
    # Send request to get file size
    response = requests.get(url, stream=True)
    total_size = int(response.headers.get('content-length', 0))

    # Download with a progress bar
    with open(file_name, "wb") as file, tqdm(
        desc=file_name,
        total=total_size,
        unit="B",
        unit_scale=True,
        unit_divisor=1024,
    ) as bar:
        for chunk in response.iter_content(chunk_size=8192):
            file.write(chunk)
            bar.update(len(chunk))

    print("Download complete:", file_name)

# Extract ZIP file in the current directory
with zipfile.ZipFile(file_name, "r") as zip_ref:
    # Check if files already exist (to prevent re-extraction)
    if any(os.path.exists(name) for name in zip_ref.namelist()):
        print("Files already extracted. Skipping extraction.")
    else:
        zip_ref.extractall(".")
        print("Extraction complete!")
