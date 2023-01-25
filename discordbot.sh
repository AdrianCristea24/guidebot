#!/bin/bash
kill -9 `ps -afe|grep node|grep raduoliu|grep index.js|awk '{print $2}'`
cd /home/developers/raduoliu/discordbot/ && npm i
cd /home/developers/raduoliu/discordbot/ && node ./index.js 2>&1 >> /home/developers/raduoliu/discordbot/discordbot.log &
