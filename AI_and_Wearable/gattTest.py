import pexpect

DEVICE="DF:40:DA:83:AD:7B"

child = pexpect.spawn("gatttool -I")

child.sendline("connect {0}".format(DEVICE))

child.expect("Connection successful", timeout=10)

