<?php
namespace Server\Classes;
use Server\Classes\ProductFactory;
class Database
{
    // DB Params
    private $host = 'localhost';
    private $db_name = 'products_app';
    private $username = 'root';
    private $password = '';
    private $conn;

    // DB Connect
    public function connect()
    {
        $this->conn = null;
        try {
            $this->conn = new \PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        } catch (\PDOException $e) {
            echo 'Connection Error: ' . $e->getMessage();
        }
    }

    public function read()
    {
        $sqlQuery = "SELECT * FROM `products`  \n"
          . "ORDER BY `products`.`sku` ASC;";
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->execute();
        $productArr = array();

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            extract($row);
            $product = array(
              'sku' => $sku,
              'name' => $name,
              'price' => $price,
              'product_type' => $product_type
            );
            $productObject = ProductFactory::create($product_type, $sku, $name, $price, $type_specific_information, $product_type);
            $product['type_specific_information'] = $productObject->getFormattedTypeSpecificInformation();
            // Push to "data"
            array_push($productArr, $product);
        }
        return $productArr;
    }
  
    public function insertProduct($data)
    {
        $productObject = ProductFactory::create($data->productType, $data->sku, $data->name, $data->price, $data->typeSpecificInformation, $data->productType);
        $sqlQuery = "SELECT * FROM `products`  WHERE sku=:sku";
        $stmt = $this->conn->prepare($sqlQuery);
        $sku = $productObject->getSku();
        $stmt->bindParam(':sku', $sku);
        $stmt->execute();
        $rowsCount = $stmt->rowCount();
        if ($rowsCount > 0) {
            echo json_encode("existing sku");
        } else {
            $productObject->saveProduct($this->conn);
            echo json_encode("success");
        }
    }

    public function deleteProducts($data)
    {
        $sqlQuery = "delete FROM `products`  WHERE sku=:sku";
        $stmt = $this->conn->prepare($sqlQuery);
        for ($i = 0; $i < count($data); $i++) {
            $sku = $data[$i][0];
            $stmt->bindParam(':sku', $sku);
            $stmt->execute();
        }
        return json_encode("success");
    }
}
