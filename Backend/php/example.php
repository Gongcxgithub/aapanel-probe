<?php 
/**
 * 宝塔面板站点操作类库
 * @author 阿良 or Youngxj(二次开发)
 * @version 1.0
 * @example
 * @return Array
 */
class Bt{

	private $BT_KEY = "";
  	private $BT_PANEL = "";	 
  	public function __construct($bt_panel = null,$bt_key = null){
  		if($bt_panel) $this->BT_PANEL = $bt_panel;
  		if($bt_key) $this->BT_KEY = $bt_key;
  	}
  	/**
  	 * 获取实时状态信息
  	 * (CPU、内存、网络、负载)
  	 */
  	public function GetNetWork(){
  		$url = $this->BT_PANEL.$this->config("GetNetWork");

  		$p_data = $this->GetKeyData();

  		$result = $this->HttpPostCookie($url,$p_data);

  		$data = json_decode($result,true);
  		return $data;
  	}
	/**
     * 构造带有签名的关联数组
     */
	public function GetKeyData(){
		$now_time = time();
		$p_data = array(
			'request_token'	=>	md5($now_time.''.md5($this->BT_KEY)),
			'request_time'	=>	$now_time
		);
		return $p_data;    
	}

	/**
     * 发起POST请求
     * @param String $url 目标网填，带http://
     * @param Array|String $data 欲提交的数据
     * @return string
     */
	private function HttpPostCookie($url, $data,$timeout = 60)
	{
    	//定义cookie保存位置
		$cookie_file='./'.md5($this->BT_PANEL).'.cookie';
		if(!file_exists($cookie_file)){
			$fp = fopen($cookie_file,'w+');
			fclose($fp);
		}
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file);
		curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		$output = curl_exec($ch);
		curl_close($ch);
		return $output;
	}

	/**
	 * 加载宝塔数据接口
	 * @param  [type] $str [description]
	 * @return [type]      [description]
	 */
	private function config($str){
		require_once('api-sdk.php');
		return $config[$str];
	}
}

// 修改成自己的宝塔接口和Api密钥
$bt = new Bt('http://127.0.0.1:8888','xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
header('Content-type: application/json');
echo json_encode($bt->GetNetWork());

