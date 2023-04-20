<?php
namespace Server\Classes;
use Server\Classes\Product;
// Define Book class that extends Product
class Book extends Product
{
    private $weight;

    public function __construct($sku, $name, $price, $weight, $productType)
    {
        parent::__construct($sku, $name, $price, $productType);
        $this->weight = $weight;
    }

    //set Weight
    public function setWeight($weight)
    {
        $this->weight = $weight;
    }

    //get weight
    public function getWeight()
    {
        return $this->weight;
    }
    public function getFormattedTypeSpecificInformation()
    {
        return "Weight: " . $this->getWeight() . "KG";
    }
    public function saveProduct($conn)
    {
        $sku = $this->getSku();
        $name = $this->getName();
        $price = $this->getPrice();
        $weight = $this->getWeight();
        $productType = $this->getProductType();
        $sqlQuery = "INSERT INTO `products` SET sku = :sku, name = :name, price = :price, type_specific_information = :weight, product_type = :productType";
        $stmt = $conn->prepare($sqlQuery);
        $stmt->bindParam(':sku', $sku);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':weight', $weight);
        $stmt->bindParam(':productType', $productType);
        $stmt->execute();
    }
}
