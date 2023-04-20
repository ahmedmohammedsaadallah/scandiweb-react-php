<?php
namespace Server\Classes;
use Server\Classes\Product;
// Define Disc class that extends Product

class DVD extends Product
{
    private $size;
    
    public function __construct($sku, $name, $price, $size, $productType)
    {
        parent::__construct($sku, $name, $price, $productType);
        $this->size = $size;
    }
    
    //set size
    public function setSize($size)
    {
        $this->size = $size;
    }

    //get size
    public function getSize()
    {
        return $this->size;
    }
    public function getFormattedTypeSpecificInformation()
    {
        return "Size: " . $this->getSize() . " MB";
    }
    public function saveProduct($conn)
    {
        $sku = $this->getSku();
        $name = $this->getName();
        $price = $this->getPrice();
        $size = $this->getSize();
        $productType = $this->getProductType();
        $sqlQuery = "INSERT INTO `products` SET sku = :sku, name = :name, price = :price, type_specific_information = :size, product_type = :productType";
        $stmt = $conn->prepare($sqlQuery);
        $stmt->bindParam(':sku', $sku);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':size', $size);
        $stmt->bindParam(':productType', $productType);
        $stmt->execute();
    }
}
