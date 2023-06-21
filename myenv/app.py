from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.environ.get("GOOGLE_BOOKS_API_KEY", "YOUR_API_KEY")

# Centralized error handler
@app.errorhandler(Exception)
def handle_error(error):
    print(error)
    return jsonify({"error": "An error occurred"}), 500

@app.route("/search", methods=["POST"])
def search():
    try:
        search_term = request.json.get("searchTerm")
        source = request.json.get("source")

        if source == "google":
            # Make the API request to Google Books
            response = requests.get(f"https://www.googleapis.com/books/v1/volumes?q={search_term}&key={API_KEY}&maxResults=15")
        elif source == "open_library":
            # Make the API request to Open Library
            category = request.json.get("category")
            if not category:
                return jsonify({"error": "Category is missing"}), 400
            response = requests.get(f"https://openlibrary.org/subjects/{category}.json")
        else:
            return jsonify({"error": "Invalid search source"}), 400

        # Check if the request was successful
        if response.status_code != 200:
            return jsonify({"error": "Failed to retrieve search results"}), 500

        data = response.json()
        
        books = []

        if source == "google" and "items" in data:
            items = data["items"]

            for item in items:
                volume_info = item.get("volumeInfo", {})
                title = volume_info.get("title", "Unknown")
                authors = volume_info.get("authors", ["Unknown"])
                description = volume_info.get("description", "N/A")
                image_links = volume_info.get("imageLinks", {})
                cover_image = image_links.get("thumbnail") if "thumbnail" in image_links else None
                sale_info = item.get("saleInfo", {})
                price = sale_info.get("listPrice", {}).get("amount", "N/A")
                customer_ratings = volume_info.get("averageRating", "N/A")

                book = {
                    "title": title,
                    "author": authors[0],
                    "description": description,
                    "cover_image": cover_image,
                    "price": price,
                    "customer_ratings": customer_ratings,
                }

                books.append(book)
        elif source == "open_library" and "works" in data:
            works = data["works"]

            for work in works:
                title = work.get("title", "Unknown")
                author = work.get("authors", [{}])[0].get("name", "Unknown")

                book = {
                    "title": title,
                    "author": author,
                }

                books.append(book)

        print("Received a POST request to search")

        return jsonify(books)
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred"}), 500

@app.route("/search", methods=["GET"])
def search_page():
    return "This is the search page"

if __name__ == "__main__":
    app.run()
