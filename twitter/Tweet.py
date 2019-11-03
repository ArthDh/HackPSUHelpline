import tweepy

class Tweet:

    def __init__(self):
        CONSUMER_KEY = 'IwZZeJHjLXq55ewwQwD0SogHU'
        CONSUMER_SECRET = '80kELQhDGNvLNFfNZ7qliIbzAoA3tsgQaAEnnMNWKIr6uMN6Ri'
        ACCESS_TOKEN = '857838183224139776-1HrWNTQk8pywtozedEAou6tr7CkB4Uu'
        ACCESS_TOKEN_SECRET = 'NkP6s5UZuoBmDSW31mhTzudNSQKpvxwwuE3pcWYcytWgU'
        self.auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
        self.auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
        self.api = tweepy.API(self.auth)

    def tweet(self, responder, requester):
        message = '{} is on their way to you, @{}'.format(responder, requester)
        self.api.update_status(status=message)
