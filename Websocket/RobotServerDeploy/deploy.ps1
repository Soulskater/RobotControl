$source = '..\Robot.Server\*'
$dest = '.\deployment'
Remove-Item .\deployment\* -recurse
Copy-Item $source $dest -recurse
Copy-Item .\bin $dest -recurse
Copy-Item .\Web.cloud.config $dest
Copy-Item .\Web.config $dest -recurse
Remove-Item .\deployment\node_modules -recurse
Remove-Item .\deployment\.idea -recurse
Publish-AzureServiceProject -ServiceName RobotServer -Location "North Europe" -ForceUpgrade -Launch