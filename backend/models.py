from config import db

class Animal(db.Model):
    name = db.Column(db.String(80))
    topSpeed = db.Column(db.String(80))
    lifeSpan = db.Column(db.Sring(80))
    weight = db.Column(db.String(80))
    height = db.Column(db.String(80))

    def toJson(self):
        return {
            "name": self.name,
            "topSpeed": self.topSpeed,
            "lifeSpan": self.lifeSpan,
            "weight": self.weight,
            "height": self.height,
        }