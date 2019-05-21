<?php

require 'database.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);

    $id = mysqli_real_escape_string($con, (int)$request->id);
    $title = mysqli_real_escape_string($con, trim($request->title));
    $author = mysqli_real_escape_string($con, trim($request->author));
    $content = mysqli_real_escape_string($con, trim($request->content));
    $date = mysqli_real_escape_string($con, trim($request->date));

    $sql = "UPDATE `posts` SET 'title'='$title', `author` = '$author', `content` = '$content', `date` = '$date'";

    if(mysqli_query($con, $sql)){
        http_response_code(204);
    } else {
        return http_response_code(422);
    }
}
