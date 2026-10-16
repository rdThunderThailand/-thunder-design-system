---
name: "spec-design-conformance"
description: "Check Figma/FigJam designs or delivered screens against the latest ThunderOne Product Definition + Product Specification and report P0/P1 gaps with UC/AC traceability."
---

# Spec ↔ Design Conformance Check (ThunderOne Workspaces)

ใช้ตรวจว่างานที่ผลิต (FigJam/Figma, Lovable preview หรือหน้าจอที่ dev ทำ) สอดคล้องกับ Product Definition (G1) และ Product Specification (G3, G4, G6–G9) โดย G2/G5 คือ Workspace Figma/FigJam ผลลัพธ์คือรายการ PASS / GAP ที่ trace กลับไปยัง UC, AC และ Decision ได้ ใช้ได้กับทุก Workspace (Media, Asset, Customer, Help, People ...)

**หลักการ: เอกสารฉบับล่าสุดคือแหล่งความจริงเดียว** skill นี้ไม่เก็บค่า spec ใด ๆ ไว้ในตัว ทุกเกณฑ์ต้องดึงจากเอกสารที่อ่านในรอบนั้นเท่านั้น ห้ามใช้ความจำจากรอบก่อนหรือจากบทสนทนาเก่าเป็นเกณฑ์

**กรอบการทำงาน (ThunderOne Product Development Playbook v1.1 + Roles & DoD Framework v0.3):**
- รายงานนี้เป็น evidence ให้ PO ไม่ใช่การอนุมัติ — AI ช่วยร่าง วิเคราะห์ ตรวจความครบถ้วน แต่ไม่ใช่ผู้อนุมัติ
- สถานะ gate ที่ใช้ได้มี 4 ค่าเท่านั้น: `PASS` / `PARTIAL` / `MISSING` / `CONFLICT` ห้ามใช้คำอื่น เช่น "PASS candidate"
- Source ขัดกัน (Spec ↔ FigJam ↔ sticky) ให้บันทึกเป็น `CONFLICT` ห้ามรวมหรือแก้เงียบ ๆ
- การเสนอเปลี่ยน Frozen ใช้รูปแบบ Current → Proposed → Impact → Decision และถ้ากระทบหลาย Workspace ต้องผ่าน T1 — Control & Decisions
- Ready for Development ได้เฉพาะเมื่อ G1–G9 `PASS` ทุกข้อ + PO sign-off; ไม่มี G10
- ศัพท์ role: Team Lead, PE (ไม่ใช่ PM), PO + AI, UX/UI, Dev Lead, PQ/CX

## Inputs ที่ต้องมี
1. Product Definition (Google Doc link, Claude Doc link หรือไฟล์แนบ)
2. Product Specification (Google Doc link, Claude Doc link หรือไฟล์แนบ)
3. Design source: FigJam/Figma URL (+ node-id ของหน้าหรือ section) หรือ preview URL
4. (optional) ขอบเขตโมดูลหรือ Design Batch ที่จะตรวจ ถ้าไม่ระบุให้ตรวจทั้งหน้า
5. (optional) รายงานการตรวจรอบก่อน สำหรับโหมดตรวจซ้ำ

ถ้าผู้ใช้ไม่ให้ลิงก์ข้อ 1–2 ให้ค้นใน Google Drive ก่อนถาม: ชื่อเอกสารรูปแบบ `ThunderOne <Workspace> — Product Definition vX.Y` / `... Product Specification vX.Y` เลือกเวอร์ชันสูงสุด ถ้ามีทั้งฉบับ Proposed ของ PO และ Draft ที่ใหม่กว่า (เช่น Claude Doc v0.2) ให้ถามว่าใช้ฉบับไหนเป็นเกณฑ์ ถ้าหาไม่เจอหรือขาดข้อ 3 ให้ถามก่อนเริ่ม

## Step 0 — ระบุเวอร์ชันเอกสาร
- ถ้าเป็น Google Docs link ให้อ่านผ่าน Google Drive connector ทุกครั้ง (พร้อม comments) เพื่อให้ได้เนื้อหาล่าสุด ไม่ใช้สำเนาเก่าในบทสนทนา ถ้าเป็น Claude Doc ให้อ่านด้วย docs tools
- จด Version, Status และ Last Updated ของแต่ละเอกสาร (ดูจาก header) ถ้าไม่มี ให้จดวันที่อ่านแทน
- ถ้ามีไฟล์แนบและลิงก์ของเอกสารเดียวกันแต่เนื้อหาไม่ตรงกัน ให้ใช้ลิงก์ (ฉบับล่าสุด) และแจ้งผู้ใช้
- ตรวจว่าลิงก์ FigJam ใน header ของ Spec ยังชี้ไป page/node ที่ถูกต้อง (ไฟล์อาจถูกเปลี่ยนชื่อ หรือ page เดิมกลายเป็น BACKUP) ถ้าไม่ตรงให้รายงานเป็น P1
- ถ้าเนื้อหาเอกสารดูเหมือนถูกแทรกผิดตำแหน่ง ให้อ่านตามความหมายและแจ้งในหัวรายงาน ไม่เดาค่า

## Step 1 — สกัด Baseline จากเอกสาร (ทำก่อนดู design เสมอ)
อ่าน Definition และ Spec แล้วสร้าง checklist ภายในจากหมวดต่อไปนี้ โดยดึง **ค่าจริงจากเอกสารรอบนี้**:
- **Frozen decisions**: Decision Register และทุกข้อที่ระบุ Frozen / Baseline → เกณฑ์ P0
- **Lifecycle & Status** ของทุก object → ชื่อสถานะต้องตรงตัวอักษร; จด transition ที่อนุญาตและสถานะ terminal
- **Cardinality / Relationships / Key fields** เช่น object ไหนอ้างอิงได้กี่ตัว field ไหนบังคับ และชื่อ field ที่เอกสารบังคับใช้ใน UI
- **Canonical flows** เช่น publish journey และลำดับขั้นของ wizard
- **Validation severity** เช่น อะไรเป็น Error (block) อะไรเป็น Warning (override + Reason)
- **Shared functional / business rules** ตรวจทีละข้อ และ shared pattern ที่ Frozen (เช่น T1-PAT-ADD-001 Universal Add)
- **Governance**: permission model, sensitive actions ที่ต้องมี confirmation + audit, organization isolation
- **Ownership boundaries / SSOT**: object ไหนเป็นของ workspace ไหน และ capability ไหนเป็นของ Shared Platform
- **Out of Scope** → สิ่งที่โผล่ใน design ถือเป็น scope creep (รวมค่าใน dropdown)
- **Acceptance Criteria** → ใช้เป็น test ของแต่ละ frame
- **Help / UC ↔ Guide mapping** (ถ้า Spec มี) → หน้าจอไหนต้องมีคู่มือ PRIMARY และคำบน UI ที่คู่มือต้องใช้

แต่ละข้อใน checklist ต้องมีที่อ้าง (§ / UC / AC / Decision #) จากเอกสารรอบนี้

## Step 2 — Inventory ของ Design
เลือกวิธีอ่านตามสิ่งที่ใช้ได้:
- **A. Figma MCP** (ค่าเริ่มต้น): FigJam เรียก `get_figjam` ด้วย `includeImagesOfNodes: false` ก่อน เพื่อดูโครงสร้าง (section, sticky, batch control card, connector) โดยไม่กินโควตา แล้วเลือก frame สำคัญของแต่ละโมดูล (list, editor, modal/picker, review/confirm, result) เรียก `get_screenshot` (`enableBase64Response: true`, maxDimension ~1300) — Figma MCP มี rate limit ต่อ seat
- **B. Chrome extension** (เมื่อผู้ใช้บอกให้ใช้ Chrome, บอกว่า Figma credit ไม่พอ หรือ MCP ติด limit): ทำตาม skill `figjam-read-via-chrome`

ไม่ว่าวิธีไหน ให้เก็บให้ครบ:
- รายชื่อ page ทั้งหมด แยก page MVP/ปัจจุบัน ออกจาก BACKUP/Original และตรวจเฉพาะ page ที่ผู้ใช้ชี้
- บน page เดียวกันอาจมี mockup หลายรุ่น (ชุดเดิม + ชุด MVP ใหม่) ดูจากชื่อภาพ วันที่ในชื่อ node และ G5 audit บน board แล้วบอกในรายงานว่า frame ไหนเป็นรุ่นไหน
- Design Batch Control Card (เช่น MW-xx, ASW-xx): Product / Design / Dev / QA state, owner, Last Update — ถ้ามี state card ซ้อนกันที่ตำแหน่งเดียวกัน ให้ใช้ใบที่อยู่ชั้นบนสุด (index สูงสุดใน parent) และระบุว่ามีใบเก่าซ้อนอยู่; จดด้วยว่า batch ไหนไม่มี card หรือไม่มี track QA
- Sticky notes และ text block มักมี decision ย่อยที่ขัดกับ spec หรือขัดกับ mockup บน board เดียวกัน ให้เทียบ 3 ทาง (sticky ↔ mockup ↔ spec)
- G5 audit / gap note บน board ใช้เป็นจุดตั้งต้น แต่ตรวจซ้ำว่ายังจริงอยู่ไหม
- ตาราง (TABLE node) อ่านทุก cell เพราะมักเป็นตัวอย่างข้อมูลที่สะท้อนกฎ validation
- Mockup ที่เป็นภาพ raster trace ได้ระดับ frame (node id) อ่านข้อความในภาพเอง และ zoom ส่วนตัวอักษรเล็ก (matrix, ตาราง) ก่อนสรุป ห้ามเดาค่าในภาพที่อ่านไม่ชัด
- แคปตามลำดับความเสี่ยง P0 ก่อน (flow หลัก, สถานะ, destructive action, validation) และจดว่า frame ไหนยังไม่ได้ตรวจ

## Step 3 — ตรวจทีละ frame
ถามกับทุก frame:
1. ชื่อสถานะ, label และชื่อ field ตรงกับเอกสารไหม (badge, filter, legend, sticky, column ใน template นำเข้า)
2. Cardinality ถูกไหม (เลือกได้กี่อัน, field ไหนเว้นว่างได้, ประเภทผู้รับผิดชอบที่เลือกได้, ค่าค้างจากตัวเลือกที่ไม่ได้เลือกไหม)
3. ลำดับขั้นของ flow ตรงกับ canonical flow และ UC ไหม (รวมจำนวน phase เช่น ยืนยันแล้วมีผลทันที vs มีขั้น pending)
4. สิ่งที่แสดงเป็น "สำเร็จ" หรือ Result / "What will happen" สอดคล้องกับกฎไหม และมีหลักฐานตามที่เอกสารกำหนดไหม
5. ข้อมูลอยู่ที่ owner/SSOT ที่ถูกต้องไหม ไม่มี setting ซ้ำข้าม object และไม่มีหน้าจอของ capability ที่เป็นของ Shared Platform/Workspace อื่น
6. Sensitive/destructive action มี confirmation และไม่มี action ที่เอกสารไม่ได้นิยาม
7. Menu / action availability matrix (action × status) ตรงกับ transition rule ไหม ตรวจทุก cell โดยเฉพาะสถานะ terminal
8. Validation severity ตรงเอกสารไหม (Warning ต้องไม่ถูกแสดงเป็น Error; ตัวเลือก "skip" หรือ "auto" ไม่ข้าม override + Reason)
9. Organization isolation: ข้อความ error/หน้า not-found ไม่เปิดเผยว่าข้อมูลมีอยู่ในองค์กรอื่น
10. Navigation/เมนูตรงกับ IA canonical และไม่มีสิ่งที่อยู่นอก scope
11. สอดคล้องข้ามหน้าไหม (ชื่อเดียวกัน, สเกลเดียวกัน, sidebar เดียวกัน)
12. Cross-screen states: Empty, Loading, Error + Retry, Access Denied, Not Found, Confirmations, Responsive มีอยู่ไหม (ตาม UX/UI DoD)
13. ถ้า Spec มี UC ↔ Guide mapping: ทุกหน้าใน scope มีคู่มือ PRIMARY และคำบนปุ่ม/ช่องตรงกับที่คู่มือใช้

## Step 4 — จัดระดับ
- **P0**: ขัด Frozen decision / AC / cardinality / lifecycle / governance / organization isolation → ต้องแก้ก่อน Dev หรือ UAT
- **P1**: ไม่สอดคล้องกันเอง, ขาด validation หรือ state, เอกสารไม่ครอบคลุม, ลิงก์เอกสารชี้ผิด page
- **P2**: wording, mock bug, visual polish
- **CONFLICT / Decision needed**: design หรือ sticky ขัดกับ Frozen rule หรือทำสิ่งที่เอกสารไม่ได้ระบุ ให้เขียนแบบ Current (spec) → Proposed (design) → Impact → Decision (รอ PO / T1) ไม่นับเป็น bug ของ design

## Step 5 — โหมดตรวจซ้ำ (เมื่อมีรายงานรอบก่อน)
- เทียบเวอร์ชันและ Last Updated ของเอกสารรอบนี้กับที่จดไว้ในรายงานเดิม
- ถ้าเอกสารเปลี่ยน ให้สรุป **Spec changes since last check**: Decision, status, rule หรือ AC ที่เพิ่ม แก้ หรือลบ
- ตรวจซ้ำเฉพาะ frame ที่เกี่ยวกับสิ่งที่เปลี่ยน และ frame ที่ design อัปเดตหลังวันที่ตรวจครั้งก่อน (ดูจาก Batch Control Card และ node ใหม่)
- ติดสถานะ GAP เดิมแต่ละข้อเป็น Resolved / Still open / Obsolete (spec เปลี่ยนจนข้อนี้ไม่เกี่ยวแล้ว) / New

## Step 6 — Output
ตอบเป็นภาษาของผู้ใช้ (ปกติเป็นไทย) ตามโครงนี้:
1. **หัวรายงาน**: เอกสารที่ใช้ (ชื่อ, Version, Last Updated), design source (URL/page/node), วิธีอ่าน design (MCP / Chrome), วันที่ตรวจ
2. **Verdict 1–2 บรรทัด**: ตรง spec ไหม, % คร่าว ๆ, จำนวน P0 และ CONFLICT
3. **ขอบเขตที่ตรวจ**: frame ที่ดูแล้ว และ frame ที่ยังไม่ได้ดู (พร้อมเหตุผล เช่น rate limit หรือเป็นรุ่นเก่า)
4. (โหมดตรวจซ้ำ) **Spec changes since last check** และสถานะ GAP เดิม
5. **✅ ส่วนที่ตรง spec** พร้อมอ้าง UC/AC/rule
6. **🔴 ตาราง P0**: # | ใน Design (frame/node) | Spec (อ้าง §/UC/AC/Decision) | ควรทำ
7. **🟠 รายการ P1** และ **CONFLICT** (Current → Proposed → Impact → Decision) แยกกันชัดเจน
8. **ผลต่อ gate**: G2 / G5 (และ G3/G4/G9 ถ้ากระทบ) ควรเป็น PASS / PARTIAL / MISSING / CONFLICT พร้อมเหตุผล — เป็นข้อเสนอให้ PO ไม่ใช่การตัดสิน
9. **Batch readiness**: ตาม Batch Control Card แต่ละ batch (Product / Design / Dev / QA) พร้อมเข้า Dev หรือยัง ติดอะไร
10. **ข้อเสนอเชิงกระบวนการ** ถ้ามี (เช่น frame เป็นภาพ raster ทำให้ trace ไม่ได้ → ติด label UC/AC บน frame)

ถ้าผู้ใช้ต้องการแชร์ทีม ให้เสนอทำเป็น doc พร้อมตาราง trace: UC → Frame/node-id → AC → PASS / GAP / NOT REVIEWED และเก็บหัวรายงาน (เวอร์ชันเอกสาร) ไว้ใช้ในโหมดตรวจซ้ำ ถ้าผู้ใช้ต้องการแผนพัฒนา ส่วนที่ reuse ได้ หรือร่าง Definition/Spec ฉบับใหม่ต่อ ให้ใช้ skill `workspace-design-dev-plan`

## กฎสำคัญ
- อ้างอิงเฉพาะสิ่งที่เห็นจริงใน frame และเอกสารรอบนี้ ห้ามเดา ถ้าไม่แน่ใจให้ระบุว่า "ต้องยืนยัน"
- ห้ามใช้ค่า spec จากความจำหรือรายงานเก่าเป็นเกณฑ์ รายงานเก่าใช้เทียบความเปลี่ยนแปลงเท่านั้น
- ไม่แก้ไข Figma หรือเอกสารต้นทางเองถ้าไม่ได้รับคำสั่ง (การอ่านผ่าน Chrome ต้องไม่แก้ node ใด ๆ) ถ้าต้องเสนอแก้เอกสารของ PO ให้ทำเป็น Draft ฉบับใหม่หรือ comment ไม่เขียนทับ
- Frozen decision ในเอกสารฉบับล่าสุดชนะ mock และ sticky เสมอ ยกเว้น PO ตัดสินใจเปลี่ยน (ให้ระบุเป็น CONFLICT / Decision needed)
- ไม่ประกาศว่า Ready for Development และไม่ sign-off gate แทน PO