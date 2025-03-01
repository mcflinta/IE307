# # #!/bin/bash

# # # download_tracks.sh
# # # Script to download songs from tracks.json based on track_id using spotdl.
# # # Skips tracks that have already been downloaded and renames downloaded files based on track_name using bash commands.

# # # Exit immediately if a command exits with a non-zero status
# # set -e

# # # Function to display usage
# # usage() {
# #     echo "Usage: $0 /path/to/tracks.json"
# #     exit 1
# # }

# # # Function to sanitize filenames by removing illegal characters
# # sanitize_filename() {
# #     local filename="$1"
# #     # Remove or replace characters that are illegal in filenames
# #     echo "$filename" | sed 's/[<>:"/\\|?*]/_/g'
# # }

# # # Check if the correct number of arguments is provided
# # if [ "$#" -ne 1 ]; then
# #     echo "Error: Missing tracks.json file path."
# #     usage
# # fi

# # TRACKS_JSON="$1"

# # # Check if the provided file exists
# # if [ ! -f "$TRACKS_JSON" ]; then
# #     echo "Error: File '$TRACKS_JSON' does not exist."
# #     exit 1
# # fi

# # # Check for required dependencies
# # for cmd in jq spotdl; do
# #     if ! command -v "$cmd" &> /dev/null; then
# #         echo "Error: '$cmd' is not installed. Please install it before running this script."
# #         exit 1
# #     fi
# # done

# # # Define the music directory
# # MUSIC_DIR="/home/flinta/My_work/IE307/Project/music-app-backend/music"

# # # Create the music directory if it doesn't exist
# # mkdir -p "$MUSIC_DIR"

# # echo "Reading track IDs and names from '$TRACKS_JSON'..."

# # # Extract unique track_ids along with their track_names using jq
# # # This will handle duplicates by keeping the first occurrence
# # # Assuming track_id uniquely identifies a song
# # mapfile -t tracks < <(jq -r '.[] | "\(.track_id)\t\(.track_name)"' "$TRACKS_JSON" | sort -u)

# # # Counter for downloaded, skipped, and failed tracks
# # downloaded=0
# # skipped=0
# # failed=0

# # # Iterate over each track
# # for track in "${tracks[@]}"; do
# #     # Read track_id and track_name using IFS
# #     IFS=$'\t' read -r track_id track_name <<< "$track"

# #     echo "----------------------------------------"
# #     echo "Processing Track ID: $track_id"
# #     echo "Track Name: $track_name"

# #     # Sanitize the track name to create a valid filename
# #     sanitized_track_name=$(sanitize_filename "$track_name")
# #     target_file="$MUSIC_DIR/$sanitized_track_name.mp3"

# #     # Check if the target file already exists
# #     if [ -f "$target_file" ]; then
# #         echo "✅ Track '$track_name' is already downloaded as '$sanitized_track_name.mp3'. Skipping."
# #         skipped=$((skipped + 1))
# #         continue
# #     fi

# #     # Construct the Spotify URL for the track
# #     spotify_url="https://open.spotify.com/track/$track_id"

# #     echo "🔄 Downloading from Spotify: $spotify_url"

# #     # Create a temporary directory for downloading
# #     temp_dir=$(mktemp -d)

# #     # Ensure the temporary directory is removed on exit or error
# #     trap 'rm -rf "$temp_dir"' EXIT

# #     # Change to the temporary directory
# #     pushd "$temp_dir" > /dev/null

# #     # Use spotdl to download the track without specifying the filename
# #     if spotdl "$spotify_url" --output "$temp_dir"; then
# #         echo "✅ Successfully downloaded Track ID '$track_id'."
# #     else
# #         echo "❌ Failed to download Track ID '$track_id'."
# #         failed=$((failed + 1))
# #         # Return to the original directory and continue
# #         popd > /dev/null
# #         rm -rf "$temp_dir"
# #         continue
# #     fi

# #     # Find the downloaded .mp3 file
# #     downloaded_file=$(find "$temp_dir" -type f -iname "*.mp3" | head -n 1)

# #     if [ -z "$downloaded_file" ]; then
# #         echo "❌ Downloaded file for Track ID '$track_id' not found."
# #         failed=$((failed + 1))
# #         # Return to the original directory and continue
# #         popd > /dev/null
# #         rm -rf "$temp_dir"
# #         continue
# #     fi

# #     # Rename the downloaded file to the sanitized track name
# #     mv "$downloaded_file" "$target_file"
# #     echo "🔄 Renamed to '$sanitized_track_name.mp3'."

# #     # Increment the downloaded counter
# #     downloaded=$((downloaded + 1))

# #     # Return to the original directory and remove the temporary directory
# #     popd > /dev/null
# #     rm -rf "$temp_dir"
# # done

# # echo "----------------------------------------"
# # echo "Download Summary:"
# # echo "✅ Downloaded: $downloaded"
# # echo "⏭️  Skipped: $skipped"
# # echo "❌ Failed: $failed"
# # echo "✅ Completed all tasks."

# # exit 0

# #!/bin/bash

# # download_tracks.sh
# # Script to download songs from extracted_track_ids.json using spotdl.
# # Skips tracks that have already been downloaded and renames downloaded files based on track_name using bash commands.

# # Exit immediately if a command exits with a non-zero status
# set -e

# # Function to display usage
# usage() {
#     echo "Usage: $0 /path/to/extracted_track_ids.json"
#     exit 1
# }

# # Function to sanitize filenames by removing illegal characters
# sanitize_filename() {
#     local filename="$1"
#     # Remove or replace characters that are illegal in filenames
#     echo "$filename" | sed 's/[<>:\"/\\|?*]/_/g'
# }

# # Check if the correct number of arguments is provided
# if [ "$#" -ne 1 ]; then
#     echo "Error: Missing extracted_track_ids.json file path."
#     usage
# fi

# TRACKS_JSON="$1"

# # Check if the provided file exists
# if [ ! -f "$TRACKS_JSON" ]; then
#     echo "Error: File '$TRACKS_JSON' does not exist."
#     exit 1
# fi

# # Check for required dependencies
# for cmd in jq spotdl; do
#     if ! command -v "$cmd" &> /dev/null; then
#         echo "Error: '$cmd' is not installed. Please install it before running this script."
#         exit 1
#     fi
# done

# # Define the music directory
# MUSIC_DIR="/home/flinta/My_work/IE307/Project/music-app-backend/music"

# # Create the music directory if it doesn't exist
# mkdir -p "$MUSIC_DIR"

# echo "Reading track IDs from '$TRACKS_JSON'..."

# # Extract unique track_ids using jq
# mapfile -t track_ids < <(jq -r '.[].track_id' "$TRACKS_JSON" | sort -u)

# # Counter for downloaded, skipped, and failed tracks
# downloaded=0
# skipped=0
# failed=0

# # Iterate over each track_id
# for track_id in "${track_ids[@]}"; do
#     echo "----------------------------------------"
#     echo "Processing Track ID: $track_id"

#     # Sanitize the track ID to create a valid filename
#     sanitized_track_id=$(sanitize_filename "$track_id")
#     target_file="$MUSIC_DIR/$sanitized_track_id.mp3"

#     # Check if the target file already exists
#     if [ -f "$target_file" ]; then
#         echo "✅ Track with ID '$track_id' is already downloaded. Skipping."
#         skipped=$((skipped + 1))
#         continue
#     fi

#     # Construct the Spotify URL for the track
#     spotify_url="https://open.spotify.com/track/$track_id"

#     echo "🔄 Downloading from Spotify: $spotify_url"

#     # Create a temporary directory for downloading
#     temp_dir=$(mktemp -d)

#     # Ensure the temporary directory is removed on exit or error
#     trap 'rm -rf "$temp_dir"' EXIT

#     # Change to the temporary directory
#     pushd "$temp_dir" > /dev/null

#     # Use spotdl to download the track without specifying the filename
#     if spotdl "$spotify_url" --output "$temp_dir"; then
#         echo "✅ Successfully downloaded Track ID '$track_id'."
#     else
#         echo "❌ Failed to download Track ID '$track_id'."
#         failed=$((failed + 1))
#         # Return to the original directory and continue
#         popd > /dev/null
#         rm -rf "$temp_dir"
#         continue
#     fi

#     # Find the downloaded .mp3 file
#     downloaded_file=$(find "$temp_dir" -type f -iname "*.mp3" | head -n 1)

#     if [ -z "$downloaded_file" ]; then
#         echo "❌ Downloaded file for Track ID '$track_id' not found."
#         failed=$((failed + 1))
#         # Return to the original directory and continue
#         popd > /dev/null
#         rm -rf "$temp_dir"
#         continue
#     fi

#     # Rename the downloaded file to the sanitized track ID
#     mv "$downloaded_file" "$target_file"
#     echo "🔄 Renamed to '$sanitized_track_id.mp3'."

#     # Increment the downloaded counter
#     downloaded=$((downloaded + 1))

#     # Return to the original directory and remove the temporary directory
#     popd > /dev/null
#     rm -rf "$temp_dir"
# done

# echo "----------------------------------------"
# echo "Download Summary:"
# echo "✅ Downloaded: $downloaded"
# echo "⏭️  Skipped: $skipped"
# echo "❌ Failed: $failed"
# echo "✅ Completed all tasks."

# exit 0


#!/bin/bash

# download_tracks.sh
# Script to download songs from extracted_tracks.json using spotdl.
# Supports parallel downloading based on the number of CPU threads.

# Exit immediately if a command exits with a non-zero status
set -e

# Function to display usage
usage() {
    echo "Usage: $0 /path/to/extracted_tracks.json"
    exit 1
}

# Function to sanitize filenames by removing illegal characters
sanitize_filename() {
    local filename="$1"
    # Remove or replace characters that are illegal in filenames
    echo "$filename" | sed 's/[<>:\"/\\|?*]/_/g'
}

# Check if the correct number of arguments is provided
if [ "$#" -ne 1 ]; then
    echo "Error: Missing extracted_tracks.json file path."
    usage
fi

TRACKS_JSON="$1"

# Check if the provided file exists
if [ ! -f "$TRACKS_JSON" ]; then
    echo "Error: File '$TRACKS_JSON' does not exist."
    exit 1
fi

# Check for required dependencies
for cmd in jq spotdl parallel; do
    if ! command -v "$cmd" &> /dev/null; then
        echo "Error: '$cmd' is not installed. Please install it before running this script."
        exit 1
    fi
done

# Define the music directory
MUSIC_DIR="./music"

# Create the music directory if it doesn't exist
mkdir -p "$MUSIC_DIR"

echo "Reading track IDs and names from '$TRACKS_JSON'..."

# Extract unique track_id and track_name using jq
jq -r '.[] | "\(.track_id)\t\(.track_name)"' "$TRACKS_JSON" | sort -u > /tmp/tracks_info.txt

# Define the function to download a track
download_track() {
    local track_info="$1"
    IFS=$'\t' read -r track_id track_name <<< "$track_info"

    echo "----------------------------------------"
    echo "Processing Track ID: $track_id"
    echo "Track Name: $track_name"

    # Sanitize the track name to create a valid filename
    sanitized_track_name=$(sanitize_filename "$track_name")
    target_file="$MUSIC_DIR/$sanitized_track_name.mp3"

    # Check if the target file already exists
    if [ -f "$target_file" ]; then
        echo "✅ Track '$track_name' is already downloaded as '$sanitized_track_name.mp3'. Skipping."
        return 0
    fi

    # Construct the Spotify URL for the track
    spotify_url="https://open.spotify.com/track/$track_id"

    echo "🔄 Downloading from Spotify: $spotify_url"

    # Use spotdl to download the track
    temp_dir=$(mktemp -d)
    if spotdl "$spotify_url" --output "$temp_dir"; then
        echo "✅ Successfully downloaded Track ID '$track_id'."
        # Find the downloaded .mp3 file
        downloaded_file=$(find "$temp_dir" -type f -name "*.mp3" | head -n 1)
        if [ -n "$downloaded_file" ]; then
            # Rename the file to the sanitized track name
            mv "$downloaded_file" "$target_file"
            echo "🔄 Renamed to '$sanitized_track_name.mp3'."
        else
            echo "❌ No MP3 file found for Track ID '$track_id'."
        fi
    else
        echo "❌ Failed to download Track ID '$track_id'."
    fi

    # Cleanup temporary directory
    rm -rf "$temp_dir"
}

export -f download_track sanitize_filename
export MUSIC_DIR

# Get the number of CPU threads
NUM_THREADS=$(nproc)

# Download tracks in parallel
cat /tmp/tracks_info.txt | parallel -j "$NUM_THREADS" download_track {}

# Cleanup temporary file
rm -f /tmp/tracks_info.txt

echo "----------------------------------------"
echo "✅ Completed all tasks."

exit 0
