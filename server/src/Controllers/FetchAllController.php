<?php
namespace Server\Controllers;
use Server\Classes\Database;
class FetchAllController
{
    public function fetch()
    {
        $database = new Database();
        $database->connect();
        $result = $database->read();
        echo json_encode($result);
    }
}
