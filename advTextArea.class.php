<?php

/*
 * advTextArea by Mariush
 * version 1.1.0
 *
 * Required jQuery!
 *
 * Usage:
 *
 * Include or require this file (advInput.class.php)
 *
 * Make a PHP variable (or variables) with instance of advInput class
 * eg.
 * $input = new advTextArea('name','value',array('some_class'),array('style'->'max-width:200px');
 *
 * Only the first parameter is required
 *
 * Include Css, Js and jQuery files in your HTML file HEAD section
 *
 * Write simple script:
 * <script type="text/javascript">
 * var advInput = new advInput(function(input){
 *   //do some ajax stuff to save advInput value
 * });
 * </script>
 *
 * 'input' variable is a advInput DOM object
 * so you can access to input's DOM properties
 *
 * Replace comment with your code to handle save advInput
 * value using AJAX
 *
 * TODO js code
 *
 */

class advTextArea {

    protected $Name;
    protected $ID;
    protected $Value;
    protected static $Counter = 0;
    protected $Class;
    protected $Params;

    public function __construct($Name, $Value = null, $Class = null, $Params = null) {
        $this->Name = $Name;
        $this->Value = $Value;
        $this->Class = $Class;
        $this->Params = $Params;
        $this->ID = self::$Counter;
        self::$Counter++;
    }

    public function show() {
        $ret = '<div class="advTextAreaDiv" id="advTextAreaDiv'.$this->ID.'"><div class="advTextAreaBackground" id="advTextAreaBackground'.$this->ID.'"></div>';
        $ret .= '<textarea class="advTextArea';
        foreach ($this->Class as $Class) {
            $ret .= ' '.$Class;
        }
        $ret .= '" name="'.$this->Name.'"';
        $ret .= ' id="'.$this->ID.'"';
        foreach ($this->Params as $Key=>$Param) {
            $ret .= ' '.$Key.'="'.$Param.'"';
        }
        $ret .= '>';
        $ret .= ($this->Value) ? $this->Value : '';
        $ret .= '</textarea></div>';
        return $ret;
    }
}

?>