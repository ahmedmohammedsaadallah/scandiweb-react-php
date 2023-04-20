<?php
namespace Server\Controllers;
use Server\Classes\Database;
class DeleteSelectedController
{
    public function delete($data)
    {
        $database = new Database();
        $database->connect();
        $result = $database->deleteProducts($data);
        echo $result;
    }
}
