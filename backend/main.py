from flask import request, jsonify
from config import app, db
from models import Animal
import requests

@app.route("/animal-info", methods=["GET"])
def getAnimalInfo():
    animal = Animal.query.all()
    jsonAnimal = list(map(lambda x: x.toJson(), animal))
    return jsonify({"animal": jsonAnimal})

@app.route("/enter-animal", methods=["POST"])
def enterAnimal():
    name = request.json.get("name")
    api_url = 'https://api.api-ninjas.com/v1/animals?name={}'.format(name)
    response = requests.get(api_url, headers={'X-Api-Key': ''})
    data = response.json()

    name = data[0]["name"]
    topSpeed = data[0]["characteristics"]["top_speed"]
    height = data[0]["characteristics"]["height"]
    weight = data[0]["characteristics"]["weight"]
    lifeSpan = data[0]["characteristics"]["lifeSpan"]
    if not name:
        return jsonify({"message": "Animal not found."})

    newAnimal = Animal(name=name, topSpeed=topSpeed, height=height, weight=weight, lifeSpan=lifeSpan)
    try:
        db.session.add(newAnimal)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message":"Animal added!"}), 201

@app.route("/update-animal/<int:animalId>", methods=["PATCH"])
def updateAnimal(animalId):
    animal = Animal.query.get(animalId)

    if not animal:
        return jsonify({"message": "Animal not found."}), 404
    
    data = request.json
    animal.name = data.get("name", animal.name)

    db.session.commit()

    return jsonify({"message":"Animal updated!"}), 201

@app.route("/delete-animal/<int:animalId>", methods=["DELETE"])
def deleteAnimal(animalId):
    animal = Animal.query.get(animalId)

    if not animal:
        return jsonify({"message":"Animal not found."}), 404

    db.session.delete(animal)
    db.session.commit()

    return jsonify({"message": "Animal deleted!"}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)