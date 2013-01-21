<?php

require_once(SLIMROOT."clickcal/database/database.php");

class Object
{
	protected $_db = null;

	public function __construct()
	{
		$this->_db = Database::getInstance();
	}

	private function processFields($processFor="update")
	{
		$fieldString = "";
		$valueString = "";
		foreach($this->_alterFields as $key => $value)
		{
			if($processFor === "update")
				$fieldString .= "$value = '$key', ";
			else if($processFor === "create") {
				$fieldString .= "$value, ";
				$valueString .= "$key, ";
			}
		}

		if($processFor === "update") return rtrim($fieldString, ", ") . rtrim($valueString, ", ");
		else if($processFor === "create") return "(" . rtrim($fieldString, ", ") . ") VALUES (" . rtrim($valueString, ", ").")";
		else return null;
	}

	public function loadData()
	{
		if($this->_id === null) return false;
		// pull from database
		return $this->_db->query("SELECT * FROM $this->_tableName WHERE id=:id",array(':id'=>$this->_id));
	}

	public function updateData($data)
	{
		if($this->_id === null) return false;
		// update the database
		$queryString = $this->processFields();
		return $this->_db->query("UPDATE $this->_tableName SET $queryString WHERE id=:id",$data);
	}

	public function saveData($data)
	{
		if($this->_id === null) return $this->updateData($data);
		$queryString = $this->processFields("create");
		$res = $this->_db->query("INSERT INTO $this->_tableName $queryString",$data);
		$this->_id = $this->_db->lastInsertId();
		return $res;
	}

	public function deleteData()
	{
		if($this->_id === null) return false;
		// delete from database
		return $this->_db->query("DELETE FROM $this->_tableName WHERE id=:id",array(':id'=>$this->_id));

	}
}