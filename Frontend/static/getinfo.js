$(document).ready(function () {
  function tryGetDatas() {
    swal(
      "Loading...",
      "正在从 aaPanel 获取数据中，马上就要从半人马座三星传输来了！",
      "info",
      {
        button: "爷知道了",
      }
    );
    $.ajax({
      url: "https://v2.gcxstudio.cn/aapanel/getnetwork.php",
      type: "get",
      dataType: "json",
      success: function (result, status, xhr) {
        function successInfo() {
          swal(
            "OK!",
            "您已和三体文明 α158bP 号线路上成功获取信息！~",
            "success",
            {
              button: "爷知道了",
            }
          );
        }
        setTimeout(successInfo, 4000);
      },
    });
  }
  tryGetDatas();
  function getDatas() {
    $.ajax({
      url: "https://v2.gcxstudio.cn/aapanel/getnetwork.php",
      type: "get",
      dataType: "json",
      success: function (result, status, xhr) {
        function cpuInfo() {
          let jsonInformation = result;
          // CPU 核心数
          var cpuNum_id = $("#cpuNum");
          cpuNum_id.text(jsonInformation.cpu[4]);
          // CPU 占用
          var cpuRealUsed_id = $("#cpuRealUsed");
          var cpuRealUsed_id_text = $("#cpuRealUsed_text");
          // CPU 占用百分比
          var cpuRealUsed_Pre = jsonInformation.cpu[2][0] + "%";
          cpuRealUsed_id.css("width", cpuRealUsed_Pre);
          cpuRealUsed_id_text.text(jsonInformation.cpu[2][0]);
          // CPU 型号
          var cpuInfo_WHAT_id = $("#cpuInfo_WHAT");
          cpuInfo_WHAT_id.text(jsonInformation.cpu[3]);
        }
        cpuInfo();
        function systemInfo() {
          let jsonInformation = result;
          var os_id = $("#os");
          os_id.text(jsonInformation.system);
        }
        systemInfo();
        function memInfo() {
          let jsonInformation = result;
          // 内存总量
          var memTotal_id = $("#memTotal");
          memTotal_id.text(jsonInformation.mem.memTotal);
          // 内存用量
          var memRealUsed_id = $("#memRealUsed_text");
          memRealUsed_id.text(jsonInformation.mem.memRealUsed);
          // 内存占用百分比
          var memRealUsed_id_progress = $("#memRealUsed");
          var memRealUsed_Pre_Math =
            (jsonInformation.mem.memRealUsed / jsonInformation.mem.memTotal) *
            100;
          var memRealUsed_Pre = memRealUsed_Pre_Math + "%";
          memRealUsed_id_progress.css("width", memRealUsed_Pre);
          // 系统缓存
          var memBuffers_id = $("#memBuffers");
          memBuffers_id.text(jsonInformation.mem.memBuffers);
          // 缓存化内存
          var memCached_id = $("#memCached");
          memCached_id.text(jsonInformation.mem.memCached);
        }
        memInfo();
        function panelInfo_SystemTotal() {
          let jsonInformation = result;
          // 面板运行时间
          var running_time_id = $("#running_time");
          running_time_id.text(jsonInformation.time);
          // 面板名称
          var panelTitle_id = $("#panelTitle");
          panelTitle_id.text(jsonInformation.title);
          // 面板版本
          var msg_version_id = $("#msg_version");
          msg_version_id.text(jsonInformation.version);
        }
        panelInfo_SystemTotal();
        function netWorkInfo() {
          let jsonInformation = result;
          // 实时下行
          var downRealTime_id = $("#downRealTime");
          downRealTime_id.text(jsonInformation.down);
          // 总包量
          var downPackets_id = $("#downPackets");
          var downPackets_Pre = jsonInformation.downPackets / 10000;
          downPackets_id.text(downPackets_Pre);
          // 下行流量
          var downTotal_id = $("#downTotal");
          var downTotal_Pre = jsonInformation.downTotal / 1024 / 1024 / 1024;
          downTotal_id.text(downTotal_Pre);
          // 实时上行
          var upRealTime_id = $("#upRealTime");
          upRealTime_id.text(jsonInformation.up);
          // 上行总包量
          var upPackets_id = $("#upPackets");
          var upPackets_Pre = jsonInformation.upPackets / 10000;
          upPackets_id.text(upPackets_Pre);
          // 上行流量
          var upTotal_id = $("#upTotal");
          var upTotal_Pre = jsonInformation.upTotal / 1024 / 1024 / 1024;
          upTotal_id.text(upTotal_Pre);
        }
        netWorkInfo();
        function diskInfo() {
          let jsonInformation = result;
          // 文件系统
          var diskSystem_id = $("#diskSystem");
          diskSystem_id.text(jsonInformation.disk[0].filesystem);
          // 以下为分区信息相关内容
          // 总量
          var diskTotal_id = $("#diskTotal");
          diskTotal_id.text(jsonInformation.disk[0].size[0]);
          // 已用
          var diskUsed_id = $("#diskUsed");
          diskUsed_id.text(jsonInformation.disk[0].size[1]);
          // 可用
          var diskFree_id = $("#diskFree");
          diskFree_id.text(jsonInformation.disk[0].size[2]);
          // 分区格式
          var diskType_id = $("#diskType");
          diskType_id.text(jsonInformation.disk[0].type);
          // 百分比
          var diskPercentage_id = $("#diskPercentage");
          diskPercentage_id.text(jsonInformation.disk[0].size[3]);
          var diskPercentageProgress_id = $("#diskPercentageProgress");
          diskPercentageProgress_id.css(
            "width",
            jsonInformation.disk[0].size[3]
          );
          // 以下为Inodes信息相关内容
          // 总量
          var inodesTotal_id = $("#inodesTotal");
          inodesTotal_id.text(jsonInformation.disk[0].inodes[0]);
          // 已用
          var inodesUsed_id = $("#inodesUsed");
          inodesUsed_id.text(jsonInformation.disk[0].inodes[1]);
          // 可用
          var inodesFree_id = $("#inodesFree");
          inodesFree_id.text(jsonInformation.disk[0].inodes[2]);
          // 挂载点
          var inodesType_id = $("#inodesType");
          inodesType_id.text(jsonInformation.disk[0].path);
          // 百分比
          var inodesPercentage_id = $("#inodesPercentage");
          inodesPercentage_id.text(jsonInformation.disk[0].inodes[3]);
          var inodesPercentageProgress_id = $("#inodesPercentageProgress");
          inodesPercentageProgress_id.css(
            "width",
            jsonInformation.disk[0].inodes[3]
          );
        }
        diskInfo();
        function Average() {
          let jsonInformation = result;
          var minuteAverage_id = $("#minuteAverage");
          minuteAverage_id.text(jsonInformation.load.one);
          var fiveMinuteAverage_id = $("#fiveMinuteAverage");
          fiveMinuteAverage_id.text(jsonInformation.load.five);
          var fiveteenMinuteAverage_id = $("#fiveteenMinuteAverage");
          fiveteenMinuteAverage_id.text(jsonInformation.load.fifteen);
          var maxAverage_id = $("#maxAverage");
          maxAverage_id.text(jsonInformation.load.max);
          // 以下为详细负载
          var user_id = $("#user");
          user_id.text(jsonInformation.cpu_times.user);
          var nice_id = $("#nice");
          nice_id.text(jsonInformation.cpu_times.nice);
          var system_id = $("#system");
          system_id.text(jsonInformation.cpu_times.system);
          var idle_id = $("#idle");
          idle_id.text(jsonInformation.cpu_times.idle);
          var iowait_id = $("#iowait");
          iowait_id.text(jsonInformation.cpu_times.iowait);
          var irq_id = $("#irq");
          irq_id.text(jsonInformation.cpu_times.irq);
          var softirq_id = $("#softirq");
          softirq_id.text(jsonInformation.cpu_times.softirq);
          var steal_id = $("#steal");
          steal_id.text(jsonInformation.cpu_times.steal);
          var guest_id = $("#guest");
          guest_id.text(jsonInformation.cpu_times.guest);
          var guest_nice_id = $("#guest_nice");
          guest_nice_id.text(jsonInformation.cpu_times.guest_nice);
          var activeProcesses_id = $("#activeProcesses");
          activeProcesses_id.text(jsonInformation.cpu_times.活动进程数);
          var processes_id = $("#processes");
          processes_id.text(jsonInformation.cpu_times.总进程数);
        }
        Average();
        function ioStat() {
          let jsonInformation = result;
          // 以下为读操作
          var read_bytes_id = $("#read_bytes");
          read_bytes_id.text(jsonInformation.iostat.ALL.read_bytes);
          var read_count_id = $("#read_count");
          read_count_id.text(jsonInformation.iostat.ALL.read_count);
          var read_merged_count_id = $("#read_merged_count");
          read_merged_count_id.text(
            jsonInformation.iostat.ALL.read_merged_count
          );
          var read_time_id = $("#read_time");
          read_time_id.text(jsonInformation.iostat.ALL.read_time);
          // 以下为写操作
          var write_bytes_id = $("#write_bytes");
          write_bytes_id.text(jsonInformation.iostat.ALL.write_bytes);
          var write_count_id = $("#write_count");
          write_count_id.text(jsonInformation.iostat.ALL.write_count);
          var write_merged_count_id = $("#write_merged_count");
          write_merged_count_id.text(
            jsonInformation.iostat.ALL.write_merged_count
          );
          var write_time_id = $("#write_time");
          write_time_id.text(jsonInformation.iostat.ALL.write_time);
        }
        ioStat();
      },
      error: function (xhr, status, error) {
        swal(
          "Oops!!",
          "发生错误，无法稳定连接至三体文明 α158bP 号线路，可能服务器发生异常或 API 崩溃，尝试询问管理员吧。",
          "error"
        );
        console.log("status:" + status);
      },
    });
  }
  setInterval(getDatas, 3000);
});
