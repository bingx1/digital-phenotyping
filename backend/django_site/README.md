# Django Project
This directory contains the Django project. It's been generated using `django-admin startproject ____`. All django-related source code will live in this folder.

## Documentation
The Django documentation and the steps used to generate the project can be found [here](https://docs.djangoproject.com/en/4.0/intro/tutorial01/).

## System Structure
### src
### utils

| Folder            | Application                                         | User Story        |
|-------------------|-----------------------------------------------------|-------------------|
| appForeground     | Serving for app installation and usage related data | US001             |
| callServer        | Serving for phone calls related data                | US002             |
| locationServer    | Serving for location related data                   | US003             |
| screenServer      | Serving for screen usage related data               | US004             |
| sms               | Serving for phone sms related data                  | US002             |
| twitterDataServer | Serving for client twitter related data             | US005             |
| userServer        | Serving for user management                         | US008/US010/US011 |

## Testing
The Django test case [test](https://docs.djangoproject.com/en/4.0/topics/testing/) is used for this project.
Run the following command to view the coverage result of the backend tests
```
coverage run manage.py test --parallel auto -v 2 --keepdb
coverage report -m
```
