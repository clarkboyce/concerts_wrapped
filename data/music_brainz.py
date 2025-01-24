import musicbrainzngs
import time
import csv

# Set up MusicBrainz API
musicbrainzngs.set_useragent(
    "ConcertWrapped",
    "1.0",
    "https://github.com/yourusername/concertwrapped"
)

def get_artist_mbid(artist_name):
    """
    Search for an artist and return their MusicBrainz ID (MBID)
    """
    try:
        # Add delay to respect rate limiting
        time.sleep(1)
        
        # Search for the artist
        result = musicbrainzngs.search_artists(artist_name, strict=False, limit=1)
        
        if result['artist-list'] and len(result['artist-list']) > 0:
            artist = result['artist-list'][0]
            return artist['id']
        else:
            return ''
            
    except Exception as e:
        print(f"Error processing {artist_name}: {str(e)}")
        return ''

def main():
    # Read the existing CSV file
    existing_artists = set()
    artists_data = []
    
    # Load existing artists
    try:
        with open('artist_file1.csv', 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            artists_data = list(reader)
            existing_artists = {row['Artist'].lower() for row in artists_data}
    except FileNotFoundError:
        print("artist_file1.csv not found - will create new file")

    # Read new artists and filter out duplicates
    new_artists_data = []
    try:
        with open('new_artists.csv', 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                # Ensure all required fields exist
                cleaned_row = {
                    'Artist': row.get('Artist', ''),
                    'Genre': row.get('Genre', ''),  # Use empty string if Genre is missing
                    'MBID': row.get('MBID', '')     # Use empty string if MBID is missing
                }
                if cleaned_row['Artist'].lower() not in existing_artists:
                    new_artists_data.append(cleaned_row)
                    existing_artists.add(cleaned_row['Artist'].lower())
    except FileNotFoundError:
        print("new_artists.csv not found")
        return

    # Process each new artist
    print("Starting artist lookup...")
    for row in new_artists_data:
        artist_name = row['Artist']
        print(f"Processing: {artist_name}")
        mbid = get_artist_mbid(artist_name)
        row['MBID'] = mbid
        status = "✓" if mbid else "✗"
        print(f"{status} {artist_name}: {mbid or 'Not found'}")
        artists_data.append(row)

    # Write back to CSV
    with open('artist_file1.csv', 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['Artist', 'Genre', 'MBID'])
        writer.writeheader()
        writer.writerows(artists_data)

    # Print summary
    total = len(artists_data)
    successful = sum(1 for row in artists_data if row['MBID'])
    print(f"\nProcessing complete!")
    print(f"Total artists: {total}")
    print(f"Successfully matched: {successful}")
    print(f"Failed: {total - successful}")
    print("\nResults saved to artist_file1.csv")

if __name__ == "__main__":
    main()
