Copy-Item ..\Robot.Common .\deployment\Robot.Common -recurse
Copy-Item ..\Robot.Server .\deployment\Robot.Server -recurse
Copy-Item .\deployment\Robot.Server\package.json .\deployment\package.json
Publish-AzureServiceProject -ServiceName RobotServer -Location "North Europe" -ForceUpgrade -Launch