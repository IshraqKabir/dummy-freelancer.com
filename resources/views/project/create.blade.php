<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="{{ secure_asset('css/reset.css') }}">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;1,900&display=swap" rel="stylesheet"> 
</head>
<body>
    <form action="/post-project" method="POST">
        @csrf
        <div id="post_project"></div>
    </form>
    <script src="js/project/post-project.js" defer></script>
</body>
</html>
