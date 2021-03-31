laravello is a list-making single page application with Laravel,Vue,Graphql and Tailwind.

## Installation

Clone the repository

    git clone https://github.com/mojtaba33/laravello.git laravello

Switch to the repo folder

    cd laravello

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env  (Set the database connection in .env)


Install all the dependencies using composer

    composer install


Generate a new application key

    php artisan key:generate


Run the database migrations (**Set the database connection in .env before migrating**)

    php artisan migrate

Fill the database with fake information

    php artisan db:seed

Start the local development server

    php artisan serve

You can now access the server at **http://localhost:8000** and You can sign-up to it and use it.
