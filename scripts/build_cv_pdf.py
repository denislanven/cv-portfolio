"""Build the five compact CV PDFs from reviewed, language-specific copy."""
import html,json,re
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfdoc import PDFString
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

ROOT=Path(__file__).resolve().parents[1]
COPY=json.loads((ROOT/'scripts/cv_pdf_copy.json').read_text())
for name,file in [('Regular','DejaVuSans.ttf'),('Bold','DejaVuSans-Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name,'/usr/share/fonts/truetype/dejavu/'+file))
pdfmetrics.registerFontFamily('Regular',normal='Regular',bold='Bold')
W,H=595.28,841.89
CONTACT='<link href="mailto:denis.lanven@proton.me" color="#1638e2">denis.lanven@proton.me</link> · <link href="https://www.linkedin.com/in/dlanven/" color="#1638e2">LinkedIn: /in/dlanven</link> · <link href="https://t.me/denis_lanven" color="#1638e2">Telegram: @denis_lanven</link>'

def clean(t):
    return t.replace('ё','е').replace('Ё','Е').replace('—','-').replace('–','-')
def xml(t):
    return html.escape(html.unescape(clean(t)),quote=False).replace('&lt;br/&gt;','<br/>')
def flows(lang,d):
    pages=[[],[]]
    def add(pg,t,style='body',gap=7,raw=False):pages[pg].append((t,style,gap,raw))
    def section(pg,t):add(pg,'','body',3);add(pg,t,'heading',6)
    def job(pg,j):
        name,role,meta,bullets=j
        add(pg,name,'job',2);add(pg,role,'body',2);add(pg,meta,'meta',5)
        for b in bullets:add(pg,'• '+b,'body',3)
        add(pg,'','body',2)
    add(0,'DENIS LANVEN','title',4)
    add(0,'HR HEAD / PEOPLE & CULTURE LEAD','role',10)
    add(0,xml(d['location'])+'<br/>'+CONTACT,'meta',11,True)
    add(0,'<link href="https://denislanven.github.io/cv-portfolio/?lang='+lang+'" color="#1638e2">'+xml(d['links'][0])+'</link> · <link href="https://denislanven.github.io/cv-portfolio/portfolio.html?lang='+lang+'" color="#1638e2">'+xml(d['links'][1])+'</link>','meta',10,True)
    add(0,d['summary'],'body',10)
    section(0,d['sections'][0])
    for j in d['jobs'][:3]:job(0,j)
    add(1,'DENIS LANVEN / HR HEAD','role',14)
    section(1,d['sections'][1])
    for j in d['jobs'][3:]:job(1,j)
    for label,key,style in [(2,'skills','body'),(3,'languages','body'),(4,'education','meta')]:
        section(1,d['sections'][label]);add(1,d[key],style,9)
    add(1,d['tech'],'body',8)
    add(1,d['references'],'body',4)
    return pages

def build(lang,d):
    pages=flows(lang,d)
    for scale in [1,.98,.96,.94,.92,.90]:
        styles={k:ParagraphStyle(k,fontName='Bold' if k in ['title','role','heading','job'] else 'Regular',fontSize=z*(scale if k in ['body','meta'] else 1),leading=l*(scale if k in ['body','meta'] else 1),textColor=HexColor('#14202c')) for k,z,l in [('title',28,32),('role',12,17),('heading',11,16),('job',10,15),('body',9,13.5),('meta',8,12)]}
        prepared=[]
        for flow in pages:
            items=[]
            for t,style,gap,raw in flow:
                q=Paragraph(t if raw else xml(t),styles[style]) if t else None
                height=q.wrap(W-88,H)[1] if q else 0
                items.append((q,height,gap))
            prepared.append(items)
        heights=[sum(h+gap for q,h,gap in page) for page in prepared]
        if max(heights)<H-42-54:break
    else:raise ValueError(f'{lang}: two-page layout overflow: {heights}')
    out=ROOT/f'docs/downloads/Denis_Lanven_HR_Head_{lang.upper()}.pdf'
    out.parent.mkdir(parents=True,exist_ok=True)
    c=canvas.Canvas(str(out),pagesize=(W,H));c.setTitle(f'Denis Lanven | HR Head | {lang.upper()}');c.setAuthor('Denis Lanven');c.setSubject(f'Curriculum vitae / {lang}')
    c._doc.Catalog.Lang=PDFString(lang)
    for page,items in enumerate(prepared,1):
        c.setFillColor(HexColor('#1638e2'));c.rect(0,H-10,W,10,fill=1,stroke=0)
        y=H-42
        for q,h,gap in items:
            if q:q.drawOn(c,44,y-h)
            y-=h+gap
        assert y>54,(lang,page,y)
        c.setStrokeColor(HexColor('#d7dce1'));c.line(44,43,W-44,43)
        c.setFont('Regular',7);c.setFillColor(HexColor('#68717a'));c.drawString(44,29,'Denis Lanven | HR Head / People & Culture Lead');c.drawRightString(W-44,29,f'{page} / 2');c.showPage()
    c.save();print(f'{lang}: 2 pages; text scale {scale}; page heights {heights}; {out.name}')

if __name__=='__main__':
    for lang,d in COPY.items():build(lang,d)
