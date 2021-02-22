<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config("app.name") }}</title>
        <link rel="stylesheet" href="{{ mix("css/app.css") }}">
        <script src="{{ mix("js/app.js") }}" defer ></script>
    </head>
    <body class="bg-green-400 box-border font-sans">
        <div id="app">
            <router-view></router-view>
        </div>
    </body>
</html>
