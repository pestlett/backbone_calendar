<?php

require_once(SLIMROOT."clickcal/base_classes/object.php");

class Collection extends Object
{
	private $_modelType = null;
	private $_models = array();

	public function __construct($modelType)
	{
		$this->_modelType = $modelType;
		require_once(SLIMROOT."application/models/{$this->_modelType}.php");
		parent::__construct();
	}

	/**
	 * Add a model to our collection
	 * @param Model $model
	 * @return Booloan Successfully add model to our collection?
	 */
	public function add($model)
	{
		if(strtolower(get_class($model)) !== strtolower($this->_modelType) ) return false;
		array_push($this->models, $model);
		// Could check to see if array_push is now greater than the previous element count and return that, but no need...
		return true;
	}

	public function remove($model)
	{
		if(strtolower(get_class($model)) !== strtolower($this->_modelType) ) return false;
		unset($this->_models[array_search($model, $this->_models, true)]);
		// Could check to ensure model HAS been removed from collection...
		return true;
	}
}