<?php
namespace Server\Controllers;
use Server\Classes\Database;
class InsertController
{
    public function insert($data)
    {
        $database = new Database();
        $database->connect();
        $result = $database->insertProduct($data);
        echo $result;
    }
}
