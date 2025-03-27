from config import db

class Animal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    topSpeed = db.Column(db.String(30))
    height = db.Column(db.String(30))
    length = db.Column(db.String(30))
    weight = db.Column(db.String(30))
    lifeSpan = db.Column(db.String(30))

    def toJson(self):
        return {
            "id" : self.id,
            "name" : self.name,
            "topSpeed" : self.topSpeed,
            "height" : self.height,
            "length" : self.length,
            "weight" : self.weight,
            "lifeSpan" : self.lifeSpan,
        }