<?php

require 'database.php';

//Get data from database
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

//    Sanitize
    $title = mysqli_real_escape_string($con, trim($request->title));
    $author = mysqli_real_escape_string($con, trim($request->author));
    $content = mysqli_real_escape_string($con, trim($request->content));
    $date = mysqli_real_escape_string($con, trim($request->date));
    $comments = mysqli_real_escape_string($con, trim($request->comments));

//    Create new post
    $sql = "INSERT INTO `posts`(`id`, `title`, `author`, `content`, `date`) VALUES (null, '{$title}', '{$author}', '{$content}', '{$date}')";
    if (mysqli_query($con, $sql)) {
        http_response_code(201);
        $posts = [
            'id' => mysqli_insert_id($con),
            'title' => $title,
            'author' => $author,
            'content' => $content,
            'date' => date('MMMM d - hh:mm')
        ];
        echo json_encode($posts);
    } else {
        http_response_code(422);
    }
}
