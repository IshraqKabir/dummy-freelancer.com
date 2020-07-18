<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="{{ secure_asset('css/reset.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ secure_asset('css/main.css') }}">
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"> 
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;1,900&display=swap" rel="stylesheet"> 
</head>
<body>
    @include ('layouts.navbar')
    @yield ('content')
</body>
</html>