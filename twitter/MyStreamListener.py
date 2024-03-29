import tweepy
import numpy as np
from app import models, db


class MyStreamListener(tweepy.StreamListener):

    def on_status(self, status):
        if not type(status.place) == type(None):
            temp = status.place.bounding_box.coordinates
            np_temp = np.array(temp)
            np_avg = np.average(np_temp, axis=1)
            t_avg_coords = np.reshape(np_avg, (2, ))
            t_lat = t_avg_coords[0]
            t_lng = t_avg_coords[1]
            t_username = status.user.screen_name
            t_message = status.text
            t_radius = 0

            print(t_username, t_message, t_lat, t_lng, t_radius)
            print("-" * 30)

            user = models.Requesters.query.filter_by(username=t_username).first()
            # Check the user exists
            if user is not None:
                print("Request Exists")
            else:
                requester = models.Requesters(
                    username=t_username,
                    lat=t_lng,
                    lng=t_lat,
                    message=t_message,
                    radius=t_radius
                )
                # Insert the user in the database
                db.session.add(requester)
                db.session.commit()
        else:
            print("Enter location please.")
            pass
