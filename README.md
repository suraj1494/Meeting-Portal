# Meeting-Portal
Portal by which you can schedule your meeting in two different space i.e C1 and C2

BACKEND
  ->In backend inside config.json file you must enter your MqSQL credentials
  ->Here meet_app_details is our TABLE name created in DB
  ->meet_app_details TABLE MUST HAVE 
  ->id: DATA TYPE of INTEGER with NOT NULL, UNIQUE, UNSIGNED, AUTO INCREMENT checked while creating this id column
  ->title: DATA TYPE of VARCHAR(125) with NOT NULL
  ->name: DATA TYPE of VARCHAR(125) with NOT NULL
  ->email: DATA TYPE of VARCHAR(125) with NOT NULL
  ->meetingDate: DATA TYPE of DATE with NOT NULL
  ->meetingST: DATA TYPE of TIME(3) with NOT NULL
  ->meetingET: DATA TYPE of TIME(3) with NOT NULL
  ->space: DATA TYPE of INTEGER

FRONTEND
  ->Frontend is developed by using ANGULAR
  ->Inside Header component open .html file and change your image in src attribute
