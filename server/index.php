<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once __DIR__ . '/vendor/autoload.php';
use Server\Controllers\FetchAllController;
use Server\Controllers\InsertController;
use Server\Controllers\DeleteSelectedController;
$request = $_SERVER['REQUEST_URI'];
switch ($request) {
    case "/server/api/readAll.php":
        $controller = new FetchAllController();
        $controller->fetch();
        break;
    case "/server/api/insertProduct.php":
        $data = json_decode(file_get_contents("php://input"));
        $controller = new InsertController();
        $controller->insert($data);
        break;
    case "/server/api/deleteProducts.php":
        $data = json_decode(file_get_contents("php://input"));
        $controller = new DeleteSelectedController();
        $controller->delete($data);
        break;
    default:
        echo "Page not found";
        break;
}
