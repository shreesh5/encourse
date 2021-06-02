# full-stack-project

Encourse is a mobile application designed for students and administrators. It is built with React-Native and connects to a Django backend that is connected to a PostgreSQL database. Encourse allows students to enroll/drop courses and allows admins to create/edit/delete courses as well as to view/edit/delete users.

## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed `PostgreSQL 13.3`
* You have installed `Python 3.9.5`

## Installing encourse & encourse-backend

To install encourse & encourse-backend, follow these steps:

### Setup PostgreSQL database and user
Run the following commands to setup the PostgreSQL database and create a user:
```
CREATE DATABASE carnadb;

CREATE USER carnatest WITH PASSWORD 'testpassword';

ALTER ROLE carnatest SET client_encoding TO 'utf8';

ALTER ROLE carnatest SET default_transaction_isolation TO 'read committed';

ALTER ROLE carnatest SET timezone to 'UTC';

GRANT ALL PRIVILEGES ON DATABASE carnadb to carnatest;
```

### Setup Django server
1. Create a virtual environment called test and activate it:
```
cd encourse-backend
python3 -m venv test

source test/bin/activate
```
2. Install dependencies:
```
pip3 install -r requirements.txt
```
3. If testing on Android emulator, make the following changes:
```
In encourse-backend/config/settings.py add your <IP_ADDRESS> to the ALLOWED_HOSTS lists on line 28
```
4. Migrate changes:
```
python3 manage.py makemigrations

python3 manage.py migrate
```
5. Create superuser (this username and password can be used to login in the app):
```
python3 manage.py createsuperuser
```
6. Setup the server
```
Testing on iOS: python3 manage.py runserver

Testing on Android: python3 manage.py runserver <IP_ADDRESS>
```

### Setup React-Native application
1. Run the following commands in a separate terminal window to setup the application:
```
cd encourse
yarn install
cd ios
pod install
cd ..
yarn start --reset-cache
```
2. Run the following command in a separate terminal tab to launch the application:
```
iOS: react-native run-ios

Android: react-native run-android
```

## Summary of what was built and what was (deliberately) not

## Context on decisions and framework choices

## Areas for improvements
- One of the main areas of improvement is the testing of the app. I used Jest and @testing-library/react-native to write the tests for each of the components and the screens. I am fairly new to using @testing-library/react-native so I spent a lot of time researching and looking at the documentation in order to write the tests. I do understand that the tests that I wrote do not cover the entire app and hence this is definitely an area of improvement.
- A second area of improvement is the enrollment features provided by the app. Currently the app only allows for students to enroll in and drop courses but it doesn't show the user which courses they are enrolled in. If I had more time, I would have liked to include this feature as well.
- Another area of improvement is including accessibility features. I recognize the importance of accessibility as it allows for more inclusivity and demonstrates to users that they can still use the app regardless of any disability that they might have.

## Contact

If you want to contact me you can reach me at <shreeshnayak@address.com>.

## License

This project uses the following license: [MIT](https://opensource.org/licenses/MIT).
