<?php

require_once(SLIMROOT."clickcal/database/config/database.config.php");

class Database
{
	private static $_instance = null;
	private $_connection = null;

	private function __construct()
	{
			$this->connect();
	}

	private function connect()
	{
		$this->_connection = new PDO("mysql:dbname=".DBBASE.";host=".DBHOST, DBUSER, DBPASS);
		$this->_connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}

	public static function getInstance()
	{
		if(self::$_instance === null){
			try{
				self::$_instance = new Database();
			} catch(PDOException $ex) {
				echo "Connection failed: " . $ex->getMessage();
			}
		}
		return self::$_instance;
	}

	public function query($query, $args)
	{
		$tokens = explode(" ",$query);
		try{
			$sth = $this->_connection->prepare($query);
			if(empty($args))
				$sth->execute();
			else
				$sth->execute($args);

			if($tokens[0] == "SELECT"){
				$sth->setFetchMode(PDO::FETCH_ASSOC);
				$results = $sth->fetchAll();
				return $results;
			}
		} catch (PDOException $e) {
			echo 'Query failed: ' . $e->getMessage();
			echo '<br />Query : ' . $query;
		}
		return 1;
	}

	public function lastInsertId()
	{
		return $this->_connection->lastInsertId();
	}
}