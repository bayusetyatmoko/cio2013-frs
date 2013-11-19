cio2013-frs
===========
Demo Program Kuliah Database CIO-ITS 2013

Topik :
=======
Program SIM Akademik / FRS (Form Rencana Studi)

Kebutuhan Teknologi :
=====================
1. Database Server = MySQL 5 (http://www.mysql.com/)

2. Git Client = Git v1.8.4.3 (http://git-scm.com/)  

3. Programming Language = Nodejs v0.10.22 (http://nodejs.org/)

4. Node Packaged Manager = NPM v1.3.14 (https://npmjs.org)

5. Web MVC Framework = Sails.js v0.9.7 (http://sailsjs.org/)


Langkah-langkah Instalasi Program :
===================================
1. Install MySQL

http://www.mysql.com/why-mysql/windows/

http://www.apachefriends.org/en/xampp-windows.html

http://www.howtoforge.com/installing-apache2-with-php5-and-mysql-support-on-debian-wheezy


2. Install Git Client

http://git-scm.com/downloads

http://git-scm.com/book/en/Getting-Started-Installing-Git


3. Ambil Source Code di Github

Ada 2 cara yaitu :

a. Buat account di https://github.com

http://git-scm.com/book/en/Getting-Started-First-Time-Git-Setup

[Command] 

$ git clone git://github.com:bayusetyatmoko/cio2013-frs.git

b. Langsung download di : 

https://github.com/bayusetyatmoko/cio2013-frs/archive/master.zip

(tanpa harus buat account di github.com)


04. Install Nodejs
http://nodejs.org/download/
https://github.com/joyent/node
http://www.joyent.com/blog/installing-node-and-npm/
[Command]
$ node -v
v0.10.13
(check after install)

05. Install NPM
https://gist.github.com/isaacs/579814
[Command]
$ curl https://npmjs.org/install.sh | sh
$ npm -v
1.3.11
(check after install)
Pada O/S Windows Saat Install Nodejs maka Otomatis Install NPM.

06. Install Sailsjs
http://sailsjs.org/#!getStarted
[Command]
$ sudo npm -g install sails
$ sails -v
info: v0.9.7
(check after install)

07. Running Program
$ unzip cio2013-frs-master.zip
$ ls -lh
total 256K
drwxr-xr-x 7 bayu bayu 4.0K Nov 19 19:46 cio2013-frs-master
-rw-r--r-- 1 bayu bayu 246K Nov 19 21:25 cio2013-frs-master.zip
$ mv cio2013-frs-master cio2013-frs
$ cd cio2013-frs

~/cio2013-frs$ npm install

~/cio2013-frs$ cd config/
~/cio2013-frs/config$ vi local.js
module.exports = {
  port: process.env.PORT || 1337,
  environment: process.env.NODE_ENV || 'development',
	adapters: {
		// If you leave the adapter config unspecified 
		// in a model definition, 'default' will be used.
		'default': 'mysql',

		// Persistent adapter for DEVELOPMENT ONLY
		// (data is preserved when the server shuts down)
		'disk': {
			module: 'sails-disk'
		},
		
		// MySQL is the world's most popular relational database.
		// Learn more: http://en.wikipedia.org/wiki/MySQL
		'mysql': {
			module   : 'sails-mysql',
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : 'cio2013frs',
			schema   : true
		}
	}
};

~/cio2013-frs/config$ cd ..

~/cio2013-frs$ sails lift

... That's All Folks :)


Our Program Screenshot : 
========================
https://github.com/bayusetyatmoko/cio2013-frs/wiki

Our Demo Website :
==================
http://cio2013frs.jvnix.com

Happy Coding ...

Best Regards,

Bayu Setyatmoko :)
