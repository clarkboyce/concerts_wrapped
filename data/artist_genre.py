import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd
import time
import csv

# You'll need to set these up at https://developer.spotify.com/dashboard
CLIENT_ID = '31751ebb936b491a8cba4af70387a7d5'
CLIENT_SECRET = '5e5d3151442349a7941d5375f20ae9a6'

# Initialize Spotify client
client_credentials_manager = SpotifyClientCredentials(
    client_id=CLIENT_ID, 
    client_secret=CLIENT_SECRET
)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

def get_artist_genre(artist_name):
    try:
        # Search for the artist
        results = sp.search(q=artist_name, type='artist', limit=1)
        
        # Check if we found any artists
        if results['artists']['items']:
            # Get the genres for the first (most relevant) result
            genres = results['artists']['items'][0]['genres']
            # Return the first genre if it exists, otherwise return 'Other'
            return genres[0] if genres else 'Other'
        return 'Other'
    except Exception as e:
        print(f"Error processing {artist_name}: {str(e)}")
        return 'Other'

def process_artists_file(input_file):
    # Read the CSV file with basic parameters
    df = pd.read_csv(input_file, encoding='utf-8')
    
    # Ensure we're working with a clean artist column
    if 'Artist' not in df.columns:
        # If 'Artist' column doesn't exist, assume the first column is artists
        df = df.rename(columns={df.columns[0]: 'Artist'})
    
    # Clean the artist names
    df['Artist'] = df['Artist'].str.strip()
    
    # Process each artist
    genres = []
    for artist in df['Artist']:
        genre = get_artist_genre(artist)
        genres.append(genre)
        time.sleep(0.1)
        
    df['Genre'] = genres
    output_file = 'artists_with_genres.csv'
    df.to_csv(output_file, index=False)
    print(f"Results saved to {output_file}")

# Run the script
if __name__ == "__main__":
    process_artists_file('new_artists.csv')