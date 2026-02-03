# 03-Linux-Hardening Lab
## File Permission Analysis
-rw-r--r--. 1 userland userland 1282 Feb  3 07:25 /etc/passwd
-rw-r-----. 1 userland userland 730 Feb  3 07:25 /etc/shadow

## User & Privilege Info
userland
uid=2000(userland) gid=2000(userland) groups=2000(userland)
userland
-rw-------. 1 userland userland 15 Feb  3 09:44 testfile.txt
-rw-------. 1 userland userland 15 Feb  3 09:44 testfile.txt

## Observations
- Linux enforces access control using permissions and ownership
- Sensitive system files restrict access by design
- Proper chmod usage reduces attack surface
- User privilege separation is a core defense mechanism
