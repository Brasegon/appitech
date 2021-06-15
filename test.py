from git import Repo
import os
import sched, time
def autopullpush(repo):
    my_repo = Repo(repo)
    my_repo.remotes.origin.pull()
    my_repo.remotes.bot.push()

def test():
    autopullpush("T-YEP-600-MAR-6-1-finalproject-valentin.lyon")

while True:
    test()
    time.sleep(10)