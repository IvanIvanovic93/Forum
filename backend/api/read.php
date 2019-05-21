<?php

require 'database.php';

$posts = [];
$sql = "SELECT * FROM posts";

if ($result = mysqli_query($con, $sql)) {
    $i = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $posts[$i]['comments'] = $row['comments'];
        $posts[$i]['content'] = $row['content'];
        $posts[$i]['author'] = $row['author'];
        $posts[$i]['title'] = $row['title'];
        $posts[$i]['date'] = $row['date'];
        $posts[$i]['id'] = $row['id'];
        $i++;
    }
    echo json_encode($posts);
} else {
    http_response_code(404);
}
