"use client";
import React, { useState, useEffect } from "react";
import {
  IconDownload,
  IconCircleCheck,
  IconPencil,
  IconUpload,
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
  IconMapPin,
  IconClock,
  IconPhone,
  IconMail,
  IconShield,
  IconShare,
  IconTrophy
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FullEditablePage from "@/app/(common)/cvs-page/player-cv-details/components/FullEditablePage";

const CareerItem = ({ logo, name, role, years, type }: { logo: string; name: string; role: string; years: string; type: string }) => (
  <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 group hover:border-white/20 transition-all">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
        <img src={logo} alt={name} className="w-6 h-6 object-contain" />
      </div>
      <div className="min-w-0">
        <h4 className="text-sm font-bold text-white truncate">{name}</h4>
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{role}</p>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-bold text-white/40">{years}</span>
      <span className="text-[10px] font-black text-[#E31B23] uppercase tracking-widest">{type}</span>
    </div>
  </div>
);

const GenerateCv = () => {
  const [role, setRole] = useState<string>("player");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole") || "player";
    setRole(userRole);
  }, []);

  const generateProfessionalPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <html>
        <head>
          <title>Technical Scouting Report - Marcus Silva</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
            body {
              font-family: 'Inter', sans-serif;
              color: #111;
              margin: 0;
              padding: 50px;
              line-height: 1.4;
              background: #fff;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              border-bottom: 4px solid #E31B23;
              padding-bottom: 40px;
              margin-bottom: 50px;
            }
            .brand { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; color: #E31B23; margin-bottom: 10px; }
            .player-name { font-size: 48px; font-weight: 900; text-transform: uppercase; letter-spacing: -2px; margin: 0; line-height: 1; }
            .player-title { font-size: 16px; font-weight: 600; color: #666; margin-top: 5px; text-transform: uppercase; }
            
            .rating-circle {
              width: 100px;
              height: 100px;
              background: #111;
              color: #fff;
              border-radius: 50%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              border: 4px solid #E31B23;
            }
            .rating-value { font-size: 36px; font-weight: 900; line-height: 1; }
            .rating-label { font-size: 10px; font-weight: 800; text-transform: uppercase; opacity: 0.6; }

            .main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
            .section { margin-bottom: 40px; }
            .section-header { 
              font-size: 14px; 
              font-weight: 900; 
              text-transform: uppercase; 
              letter-spacing: 2px; 
              color: #111;
              border-bottom: 2px solid #eee;
              padding-bottom: 8px;
              margin-bottom: 20px;
              display: flex;
              justify-content: space-between;
            }
            
            .attribute-table { width: 100%; border-collapse: collapse; }
            .attribute-row { border-bottom: 1px solid #f0f0f0; }
            .attribute-cell { padding: 10px 0; font-size: 13px; }
            .attr-label { color: #666; font-weight: 600; }
            .attr-value { font-weight: 900; text-align: right; color: #111; }
            .attr-bar-bg { width: 60px; height: 6px; background: #eee; border-radius: 3px; display: inline-block; margin-left: 15px; position: relative; top: -2px; }
            .attr-bar-fill { height: 100%; background: #E31B23; border-radius: 3px; }

            .full-width { grid-column: span 2; }
            .highlight-box { background: #f9f9f9; padding: 25px; border-radius: 15px; border: 1px solid #eee; }
            
            .footer {
              margin-top: 80px;
              padding-top: 30px;
              border-top: 1px solid #eee;
              display: flex;
              justify-content: space-between;
              font-size: 10px;
              color: #999;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 1px;
            }

            @media print {
              body { padding: 0; }
              .no-print { display: none; }
              -webkit-print-color-adjust: exact;
            }
          </style>
        </head>
        <body oncontextmenu="return false;">
          <div class="header">
            <div>
              <div class="brand">Eddie Ricci Football Management</div>
              <h1 class="player-name">Marcus Silva</h1>
              <div class="player-title">Forward • Santos FC Academy • Brazil</div>
            </div>
            <div class="rating-circle">
              <span class="rating-label">Overall</span>
              <span class="rating-value">74</span>
            </div>
          </div>

          <div class="main-grid">
            <!-- Bio Section -->
            <div class="section">
              <div class="section-header">Biological Profile</div>
              <table class="attribute-table">
                <tr class="attribute-row"><td class="attribute-cell attr-label">Age / DOB</td><td class="attribute-cell attr-value">22 / 15-03-2002</td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Height / Weight</td><td class="attribute-cell attr-value">1.82m / 76kg</td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Primary Foot</td><td class="attribute-cell attr-value">Right (Strong)</td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Secondary Foot</td><td class="attribute-cell attr-value">Left (31%)</td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Nationality</td><td class="attribute-cell attr-value">Brazilian / Italian</td></tr>
              </table>
            </div>

            <!-- Performance Metrics -->
            <div class="section">
              <div class="section-header">Scouting Summary</div>
              <table class="attribute-table">
                <tr class="attribute-row"><td class="attribute-cell attr-label">Market Value</td><td class="attribute-cell attr-value">€45M</td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Contract Until</td><td class="attribute-cell attr-value">June 2026</td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Agency</td><td class="attribute-cell attr-value">Elite Sports Management</td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Agent</td><td class="attribute-cell attr-value">John Morrison</td></tr>
              </table>
            </div>

            <!-- Technical Evaluation -->
            <div class="section">
              <div class="section-header">Technical Attributes</div>
              <table class="attribute-table">
                <tr class="attribute-row"><td class="attribute-cell attr-label">Ball Control</td><td class="attribute-cell attr-value">89 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 89%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Dribbling</td><td class="attribute-cell attr-value">85 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 85%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Finishing</td><td class="attribute-cell attr-value">84 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 84%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Short Passing</td><td class="attribute-cell attr-value">92 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 92%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Long Passing</td><td class="attribute-cell attr-value">78 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 78%"></div></div></td></tr>
              </table>
            </div>

            <!-- Physical Evaluation -->
            <div class="section">
              <div class="section-header">Physical Profile</div>
              <table class="attribute-table">
                <tr class="attribute-row"><td class="attribute-cell attr-label">Acceleration</td><td class="attribute-cell attr-value">82 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 82%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Sprint Speed</td><td class="attribute-cell attr-value">84 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 84%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Stamina</td><td class="attribute-cell attr-value">89 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 89%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Strength</td><td class="attribute-cell attr-value">75 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 75%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Agility</td><td class="attribute-cell attr-value">88 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 88%"></div></div></td></tr>
              </table>
            </div>

            <!-- Mental/Tactical Evaluation -->
            <div class="section">
              <div class="section-header">Mental & Tactical</div>
              <table class="attribute-table">
                <tr class="attribute-row"><td class="attribute-cell attr-label">Positioning</td><td class="attribute-cell attr-value">87 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 87%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Vision</td><td class="attribute-cell attr-value">91 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 91%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Decision Making</td><td class="attribute-cell attr-value">85 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 85%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Work Rate</td><td class="attribute-cell attr-value">89 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 89%"></div></div></td></tr>
              </table>
            </div>

            <!-- Advanced Metrics -->
            <div class="section">
              <div class="section-header">Intelligence Metrics</div>
              <table class="attribute-table">
                <tr class="attribute-row"><td class="attribute-cell attr-label">Focus Control</td><td class="attribute-cell attr-value">High</td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Strategy Planning</td><td class="attribute-cell attr-value">Elite</td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Adaptation Rate</td><td class="attribute-cell attr-value">Fast</td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Learning Curve</td><td class="attribute-cell attr-value">Steep</td></tr>
              </table>
            </div>

            <!-- Career Timeline -->
            <div class="section full-width">
              <div class="section-header">Professional Career History</div>
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <tr style="background: #f9f9f9; text-align: left; font-size: 11px; font-weight: 900; text-transform: uppercase;">
                  <th style="padding: 12px; border-bottom: 2px solid #eee">Season</th>
                  <th style="padding: 12px; border-bottom: 2px solid #eee">Organization</th>
                  <th style="padding: 12px; border-bottom: 2px solid #eee">Level / Role</th>
                  <th style="padding: 12px; border-bottom: 2px solid #eee">Status</th>
                </tr>
                <tr style="font-size: 13px;">
                  <td style="padding: 12px; border-bottom: 1px solid #eee">2020 - Pres</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee">Manchester City</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee">Premier Academy</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee">Active</td>
                </tr>
                <tr style="font-size: 13px;">
                  <td style="padding: 12px; border-bottom: 1px solid #eee">2016 - 2020</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee">Liverpool FC</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee">U-10 to U-14</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee">Completed</td>
                </tr>
              </table>
            </div>

            <div class="section full-width highlight-box">
              <div class="section-header">Coach Evaluation Notes</div>
              <p style="font-size: 13px; color: #444; margin: 0;">
                Marcus demonstrates elite-level vision and technical control under pressure. His ability to interpret tactical switches in real-time is well above his age bracket. Recommended for high-intensity transition systems.
              </p>
            </div>
          </div>

          <div class="footer">
            <span>Tech ID: 9F8E7D6C • Confirmed By: ER Scouting Dept</span>
            <span>Page 1 of 1 • Internal Document</span>
            <span>Date: ${new Date().toLocaleDateString()}</span>
          </div>

          <script>
            window.onload = function() { 
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div className="flex justify-between items-end print:hidden">
        <div>
          <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">Generate CV</h1>
          <p className="text-white/60 font-medium mt-2 text-lg">My Professional Football Profile</p>
        </div>
        <Button
          onClick={generateProfessionalPDF}
          className="bg-[#222222] hover:bg-[#333333] text-white border border-white/5 gap-2 px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] h-auto"
        >
          <IconDownload size={18} /> Download CV PDF
        </Button>
      </div>



      {/* Main Content */}
      <div className="flex flex-col gap-6">
        {/* Personal Information Hero - Restoring Original Design */}
        <section className="bg-[#111111] rounded-3xl border border-white/10 p-4 md:p-8 flex flex-col gap-8">
          <div className="relative rounded-3xl overflow-hidden min-h-[400px] md:min-h-[560px] border border-white/10 group flex flex-col justify-end">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('/stadium-night.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 via-[45%] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute right-0 bottom-0 h-full w-[70%] md:w-[55%] flex items-end justify-end pointer-events-none opacity-60 md:opacity-100">
              <img
                src="/ronaldo.png"
                alt="Player"
                className="h-[90%] md:h-[105%] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
              />
            </div>

            <div className="relative p-6 md:p-10 w-full space-y-8">
              <div className="flex flex-col gap-6">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-gold bg-gold/80 flex items-center justify-center backdrop-blur-2xl shadow-2xl">
                  <span className="text-3xl md:text-4xl font-black text-white font-orbitron">74</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#E31B23] border border-[#E31B23]/20 px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase w-fit tracking-[0.2em] shadow-[0_0_20px_rgba(227,27,35,0.3)]">Active Player</div>
                  <div className="space-y-2">
                    <h1 className="text-3xl md:text-6xl font-black text-white font-orbitron uppercase tracking-tighter leading-none">Marcus Silva</h1>
                    <div className="flex flex-wrap items-center gap-3 md:gap-6 text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] pt-1">
                      <span className="text-[#E31B23]">Forward</span>
                      <span className="text-white/20 hidden md:inline">/</span>
                      <span className="text-white">22 Years Old</span>
                      <span className="text-white/20 hidden md:inline">/</span>
                      <span className="flex items-center gap-3 text-white">
                        <img src="https://flagcdn.com/br.svg" alt="Brazil" className="w-4 h-3 md:w-5 md:h-3.5 object-cover rounded-sm shadow-sm" /> Brazil
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 md:gap-y-6 pt-4 md:pt-8 max-w-2xl p-4 md:p-6 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/40"><IconShield size={20} /></div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Current Club</p>
                    <p className="text-sm font-bold text-white">Santos FC Academy</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/40"><IconPhone size={20} /></div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Contact</p>
                    <p className="text-sm font-bold text-white">+44 7700 900000</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/40"><IconClock size={20} /></div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Validation Status</p>
                    <p className="text-sm font-bold text-[#FBBF24]">15 days until re-validation</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/40"><IconMail size={20} /></div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Email</p>
                    <p className="text-sm font-bold text-white truncate max-w-[180px]">MarcusSilva@k10football.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Squares - As requested by client doc */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-full">
          {/* Completion Status */}
          <div className="bg-[#111111] rounded-3xl border border-white/10 p-8 flex flex-col gap-6">
            <h3 className="text-sm font-black text-white font-orbitron uppercase tracking-widest">Completion Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-5xl font-black text-[#E31B23] font-orbitron">85%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#E31B23] rounded-full" style={{ width: "85%" }} />
              </div>
              <p className="text-[10px] text-white/40 font-bold leading-relaxed uppercase tracking-wider">
                Complete all sections to unlock Gold tier status
              </p>
            </div>
          </div>

          {/* Tier Status */}
          <div className="bg-[#111111] rounded-3xl border border-white/10 p-8 flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FBBF24]/10 blur-3xl rounded-full" />
            <div className="flex flex-col">
              <h3 className="text-3xl font-black text-[#FBBF24] font-orbitron italic tracking-tighter leading-none">GOLD</h3>
              <div className="w-full h-1 bg-[#FBBF24] mt-2 opacity-50" />
            </div>
            <p className="text-[10px] text-white/60 font-bold leading-relaxed uppercase tracking-wider mt-2">
              Your CV meets Gold standards and is ready to share with top clubs and agents.
            </p>
            <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 gap-2 w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] h-auto mt-4">
              <IconShare size={18} className="text-white/40" /> Request Re-validation
            </Button>
          </div>

          {/* Career Journey / Last Evaluated */}
          <div className="bg-[#111111] h-fit rounded-3xl border border-white/10 p-8 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#E31B23]/10 rounded-lg text-[#E31B23]">
                <IconShare size={18} />
              </div>
              <h3 className="text-sm font-black text-white font-orbitron uppercase tracking-widest">
                {role === "coach" ? "Last Player Evaluated" : "Career Journey"}
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-32 overflow-y-auto pr-3 flex flex-col gap-3">
                <CareerItem logo="/Manchester-City-F.C-Transparent-File 1.png" name="Manchester City" role="U8, U10" years="2005-2008" type="Free Transfer" />
                <CareerItem logo="/pngegg.png" name="Liverpool FC" role="U11-U12" years="2007-2010" type="Loan Transfer" />
              </div>
              <Button className="w-full bg-white/5 hover:bg-white/10 text-white/40 border border-white/10 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] h-auto gap-2">
                <IconPlus size={16} /> Add
              </Button>
            </div>
          </div>
        </div>
        <FullEditablePage editable={true} />
      </div>
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background: #000000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .container {
            width: 100% !important;
            max-width: none !important;
            padding: 20px !important;
          }
          /* Ensure backgrounds print */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Fix for grid layouts in print */
          .grid {
            display: grid !important;
          }
          /* Force dark theme colors in print */
          section, div, h1, h2, h3, h4, p, span {
            color: white !important;
          }
          .bg-black { background-color: #000 !important; }
          .bg-\\[\\#111111\\] { background-color: #111111 !important; }
          .border { border-color: rgba(255, 255, 255, 0.1) !important; }
          
          /* Hide edit buttons and adjust layout for A4 */
          button { display: none !important; }
          input, textarea { 
            border: none !important; 
            background: transparent !important;
            padding: 0 !important;
            color: white !important;
          }
          
          /* Custom PDF Header */
          .pdf-footer {
            position: fixed;
            bottom: 20px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 10px;
            color: rgba(255, 255, 255, 0.4);
            text-transform: uppercase;
            letter-spacing: 2px;
          }
        }
      `}</style>
      <div className="pdf-footer hidden print:block">
        Generated by Eddie Ricci Football Management Platform • Professional CV Profile
      </div>
    </div>
  );
};

export default GenerateCv;