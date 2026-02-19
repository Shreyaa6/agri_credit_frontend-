import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
    Users, Database, Brain, Shield, Activity, Server,
    AlertTriangle, ChevronRight, Settings, Globe,
    TrendingUp, CheckCircle2, Clock, Zap, HardDrive,
    Cpu, Wifi, Building2, Network, Fingerprint, FileText,
    BarChart3, LayoutDashboard, Lock, MousePointer2, Landmark,
    ArrowUpRight, ArrowDownRight, Search, Filter, Eye, Download,
    Briefcase, Scale, History, UserCheck, ScanFace
} from 'lucide-react';
import DashboardLayout from '../components/common/DashboardLayout';
import { adminStats, systemHealth, regionData, consentData, navLinks, bankHQStats, branchPerformance, riskHeatmap, auditLogs } from '../data/mockData';
import './AdminDashboard.css';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function AdminDashboard() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('HQ Overview');

    useEffect(() => {
        const path = location.pathname;
        const currentLink = navLinks.admin.find(link => path.includes(link.path));
        if (currentLink) {
            setActiveTab(currentLink.name);
        } else {
            setActiveTab('HQ Overview');
        }
    }, [location]);

    return (
        <DashboardLayout links={navLinks.admin} userType="admin" userName="Bank HQ Admin">
            <div className="admin-dash">
                <motion.div
                    className="admin-dash__header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="header-main">
                        <div>
                            <h1>Institution <span className="text-gradient">Control Center</span></h1>
                            <p className="admin-dash__subtitle">Enterprise HQ · Mumbai Head Office · Platform Governance</p>
                        </div>
                        <div className="header-badge">
                            <Landmark size={18} />
                            <span>Scheduled RBI Audit: <strong>Mar 15</strong></span>
                        </div>
                    </div>
                </motion.div>

                <div className="lender-dash__tabs admin-tabs">
                    {navLinks.admin.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`lender-tab ${activeTab === link.name ? 'lender-tab--active' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="admin-content">
                    <AnimatePresence mode="wait">
                        {activeTab === 'HQ Overview' && <HQOverviewSection key="hq" />}
                        {activeTab === 'Branch Performance' && <BranchManagementSection key="branches" />}
                        {activeTab === 'Enterprise Analytics' && <EnterpriseAnalyticsSection key="analytics" />}
                        {activeTab === 'Compliance & Audit' && <ComplianceAuditSection key="compliance" />}
                        {activeTab === 'Policy Engine' && <PolicyDecisionSection key="policy" />}
                        {activeTab === 'Admin Console' && <AdminConsoleSection key="console" />}
                    </AnimatePresence>
                </div>
            </div>
        </DashboardLayout>
    );
}

function HQOverviewSection() {
    return (
        <motion.div initial="hidden" animate="visible" exit="hidden" variants={fadeIn}>
            <div className="admin-dash__stats">
                {[
                    { icon: <Landmark size={24} />, label: 'Total Loan Book', value: `₹${(bankHQStats.totalLoanBook / 10000000).toFixed(0)} Cr`, color: '#2D6A4F', trend: '+12.5%' },
                    { icon: <TrendingUp size={24} />, label: 'NPA Ratio', value: `${bankHQStats.npaRatio}%`, color: '#E53E3E', trend: '-0.2%' },
                    { icon: <Globe size={24} />, label: 'Active Branches', value: bankHQStats.activeBranches, color: '#3182CE' },
                    { icon: <Briefcase size={24} />, label: 'Portfolio Growth', value: `${bankHQStats.portfolioGrowth}%`, color: '#38A169', trend: '+2.1%' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        className="admin-stat"
                        variants={fadeIn}
                        whileHover={{ y: -5 }}
                    >
                        <div className="admin-stat__icon" style={{ background: `linear-gradient(135deg, ${stat.color}, ${stat.color}aa)` }}>
                            {stat.icon}
                        </div>
                        <div className="admin-stat__data">
                            <span className="admin-stat__label">{stat.label}</span>
                            <span className="admin-stat__value">{stat.value}</span>
                            {stat.trend && (
                                <span className={`stat-trend ${stat.trend.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                                    {stat.trend} <span style={{ opacity: 0.6, fontSize: '0.65rem', marginLeft: '4px' }}>MoM</span>
                                </span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="admin-dash__grid">
                <div className="dash-card">
                    <div className="dash-card__header">
                        <h3>Risk Heatmap by Region</h3>
                        <span className="text-muted">State-wise PSL Exposure</span>
                    </div>
                    <div className="heatmap-container">
                        {riskHeatmap.map((item, i) => (
                            <div key={i} className="heatmap-row">
                                <span className="heatmap-label">{item.state}</span>
                                <div className="heatmap-gauge">
                                    <div className="heatmap-fill" style={{ width: `${item.value}%`, background: item.risk === 'Low' ? '#2D6A4F' : item.risk === 'Medium' ? '#D69E2E' : '#E53E3E' }} />
                                </div>
                                <span className="heatmap-value">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dash-card">
                    <div className="dash-card__header">
                        <h3>Institutional KPIs</h3>
                        <button className="btn-text" onClick={() => alert('Fetching real-time industry benchmarks from RBI Data Portal...')}>View Industry Benchmarks</button>
                    </div>
                    <div className="kpi-grid">
                        <div className="kpi-item">
                            <label>Regulatory Compliance (RBI)</label>
                            <div className="kpi-val text-success">100%</div>
                        </div>
                        <div className="kpi-item">
                            <label>PSL Lending Target</label>
                            <div className="kpi-val">{bankHQStats.pslTarget}%</div>
                        </div>
                        <div className="kpi-item">
                            <label>Avg Asset Yield</label>
                            <div className="kpi-val">{bankHQStats.avgYield}%</div>
                        </div>
                        <div className="kpi-item">
                            <label>Disbursement Efficiency</label>
                            <div className="kpi-val">{bankHQStats.disbursementTarget}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function BranchManagementSection() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredBranches = branchPerformance.filter(b => {
        const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.head.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <motion.div initial="hidden" animate="visible" exit="hidden" variants={fadeIn}>
            <div className="dash-card dash-card--table">
                <div className="dash-card__header">
                    <h3>Branch Level Scorecards</h3>
                    <div className="table-actions">
                        <div className="search-box-mini">
                            <Search size={14} />
                            <input
                                type="text"
                                placeholder="Search branch..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="select-mini"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="On Track">On Track</option>
                            <option value="Review">Review</option>
                            <option value="Excellent">Excellent</option>
                            <option value="High Risk">High Risk</option>
                        </select>
                    </div>
                </div>
                <div className="admin-table">
                    <div className="admin-table__header" style={{ gridTemplateColumns: '80px 1.5fr 1.2fr 100px 100px 100px 100px' }}>
                        <span>ID</span>
                        <span>Branch Name</span>
                        <span>Manager</span>
                        <span>Total Loans</span>
                        <span>Volume</span>
                        <span>NPA %</span>
                        <span>Status</span>
                    </div>
                    {filteredBranches.length > 0 ? filteredBranches.map((branch, i) => (
                        <div key={i} className="admin-table__row" style={{ gridTemplateColumns: '80px 1.5fr 1.2fr 100px 100px 100px 100px' }}>
                            <span className="text-muted">{branch.id}</span>
                            <strong style={{ color: 'var(--color-primary-dark)' }}>{branch.name}</strong>
                            <span>{branch.head}</span>
                            <span>{branch.loans}</span>
                            <span style={{ fontWeight: 700 }}>{branch.volume}</span>
                            <span className={branch.npa > 2.5 ? 'text-danger' : 'text-success'} style={{ fontWeight: 800 }}>{branch.npa}%</span>
                            <span>
                                <span className={`status-pill status-pill--${branch.status.toLowerCase().replace(' ', '-')}`}>{branch.status}</span>
                            </span>
                        </div>
                    )) : (
                        <div className="table-empty">No branches found matching your criteria.</div>
                    )}
                </div>
            </div>

            <div className="dash-card" style={{ marginTop: '2rem' }}>
                <h3>Inter-Branch Operations</h3>
                <div className="operations-grid">
                    <div className="op-card">
                        <UserCheck />
                        <div>
                            <h4>Officer Role Management</h4>
                            <p>Manage HO, Regional, and Branch manager level permissions.</p>
                        </div>
                        <button className="btn-minimal-posh" onClick={() => alert('Loading Enterprise IAM Console...')}>Manage Roles</button>
                    </div>
                    <div className="op-card">
                        <History />
                        <div>
                            <h4>Farmer Portfolio Transfer</h4>
                            <p>Initiate bulk migration of borrowers between territories.</p>
                        </div>
                        <button className="btn-minimal-posh" onClick={() => alert('Starting Portfolio Migration Wizard...')}>Start Workflow</button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function EnterpriseAnalyticsSection() {
    return (
        <motion.div initial="hidden" animate="visible" exit="hidden" variants={fadeIn}>
            <div className="admin-dash__grid">
                <div className="dash-card">
                    <h3>Portfolio Analytics</h3>
                    <p className="text-muted">Loan book aging & sector-wise exposure</p>
                    <div className="placeholder-chart" style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '8px', padding: '1rem' }}>
                        {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                            <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--color-primary)', borderRadius: '4px 4px 0 0' }} />
                        ))}
                    </div>
                    <div className="chart-legend">
                        <span>Short Term</span>
                        <span>Term Loans</span>
                        <span>Gold Loans</span>
                        <span>KCC</span>
                    </div>
                </div>
                <div className="dash-card">
                    <h3>Risk & Stress Testing</h3>
                    <p className="text-muted">PD/LGD models & Scenario analysis</p>
                    <div className="risk-metrics-list">
                        <div className="risk-metric-box">
                            <label>Value at Risk (VaR)</label>
                            <strong>₹12.4 Cr</strong>
                        </div>
                        <div className="risk-metric-box">
                            <label>Expected Credit Loss (ECL)</label>
                            <strong>₹4.2 Cr</strong>
                        </div>
                        <div className="risk-metric-box">
                            <label>CAR Ratio</label>
                            <strong className="text-success">18.4%</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dash-card" style={{ marginTop: '2rem' }}>
                <div className="dash-card__header">
                    <h3>Regulatory Reporting Status (PSL/CRILC)</h3>
                    <div className="table-actions">
                        <button className="btn-minimal-posh" onClick={() => alert('Exporting Regulatory XML Packet (XBRL)...')}><Download size={14} /> Export XML</button>
                    </div>
                </div>
                <div className="reporting-status">
                    {[
                        { name: 'RBI Digital Lending Return', status: 'Filed', date: 'Jan 10, 2025', id: 'REP-77' },
                        { name: 'CRILC Main Return (Weekly)', status: 'Filed', date: 'Jan 15, 2025', id: 'REP-78' },
                        { name: 'PSL Certificate Generation', status: 'In Progress', date: 'Pending', id: 'REP-82' },
                    ].map((report, i) => (
                        <div key={i} className="report-item-enterprise">
                            <div className="report-info">
                                <FileText size={20} className="text-primary" />
                                <div>
                                    <strong>{report.name}</strong>
                                    <p>{report.id} · Generated: {report.date}</p>
                                </div>
                            </div>
                            <span className={`status-pill status-pill--${report.status.toLowerCase().replace(' ', '-')}`}>{report.status}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

function ComplianceAuditSection() {
    const [verifying, setVerifying] = useState(false);
    const [verified, setVerified] = useState(false);

    const handleVerify = () => {
        setVerifying(true);
        setTimeout(() => {
            setVerifying(false);
            setVerified(true);
        }, 2000);
    };

    return (
        <motion.div initial="hidden" animate="visible" exit="hidden" variants={fadeIn}>
            <div className="dash-card dash-card--table">
                <div className="dash-card__header">
                    <h3>Immutable Audit Trail (Enterprise)</h3>
                    <button
                        className={`btn-text ${verified ? 'text-success' : ''}`}
                        onClick={() => {
                            handleVerify();
                            alert('Initiating SHA-256 integrity check on Distributed Ledger...');
                        }}
                        disabled={verifying}
                    >
                        {verifying ? 'Checking Ledger...' : verified ? '✓ Ledger Verified' : 'Verify Ledger'}
                    </button>
                </div>
                <div className="admin-table">
                    <div className="admin-table__header" style={{ gridTemplateColumns: '120px 140px 1.5fr 150px 100px' }}>
                        <span>Log ID</span>
                        <span>Actor</span>
                        <span>Action Detail</span>
                        <span>Timestamp</span>
                        <span>Status</span>
                    </div>
                    {auditLogs.map((log, i) => (
                        <div key={i} className="admin-table__row" style={{ gridTemplateColumns: '120px 140px 1.5fr 150px 100px' }}>
                            <span className="text-muted">{log.id}</span>
                            <strong>{log.user}</strong>
                            <span>{log.action}</span>
                            <span className="text-muted">{log.timestamp}</span>
                            <span className={`status-pill status-pill--${log.status.toLowerCase()}`}>{log.status}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="admin-dash__grid" style={{ marginTop: '2rem' }}>
                <div className="dash-card">
                    <h3>Screening & Watchlists</h3>
                    <div className="safeguards">
                        {[
                            { icon: <Shield size={18} />, title: 'AML/CFT Screening', desc: 'PEP & Sanctions list auto-check enabled' },
                            { icon: <ScanFace size={18} />, title: 'Biometric Audit', desc: 'Exec login verification required for approvals > 50L' }
                        ].map((s, i) => (
                            <div key={i} className="safeguard">
                                {s.icon}
                                <div className="safeguard-text">
                                    <strong>{s.title}</strong>
                                    <p>{s.desc}</p>
                                </div>
                                <div className="toggle-switch">
                                    <input type="checkbox" defaultChecked id={`sg-${i}`} />
                                    <label htmlFor={`sg-${i}`}></label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="dash-card">
                    <h3>Data Localisation</h3>
                    <div className="localisation-info">
                        <Network size={24} />
                        <h4>India-Only Server Integrity</h4>
                        <div className="server-list">
                            <div className="server-item">
                                <span>Primary: Mumbai (AWS)</span>
                                <span className="status-dot online"></span>
                            </div>
                            <div className="server-item">
                                <span>DR Site: Hyderabad (Azure)</span>
                                <span className="status-dot online"></span>
                            </div>
                        </div>
                        <div className="integrity-check">Integrity Verified: Today, 03:00 AM</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function PolicyDecisionSection() {
    return (
        <motion.div initial="hidden" animate="visible" exit="hidden" variants={fadeIn}>
            <div className="admin-dash__grid">
                <div className="dash-card">
                    <h3>Advanced Policy Engine</h3>
                    <p className="text-muted">Configure bank-wide lending guardrails</p>
                    <div className="policy-controls">
                        <div className="policy-control">
                            <label>Min. Agri-Trust Score for Instant Approval</label>
                            <input type="number" defaultValue={75} className="mini-input" style={{ width: '100%', textAlign: 'left', padding: '0.8rem' }} />
                        </div>
                        <div className="policy-control">
                            <label>Exposure Limit per Borrower (₹)</label>
                            <input type="text" defaultValue="500,000" className="mini-input" style={{ width: '100%', textAlign: 'left', padding: '0.8rem' }} />
                        </div>
                        <div className="policy-control">
                            <label>Geographic Concentration Cap (%)</label>
                            <input type="number" defaultValue={15} className="mini-input" style={{ width: '100%', textAlign: 'left', padding: '0.8rem' }} />
                        </div>
                        <button className="btn-minimal-posh btn-minimal-posh--primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }} onClick={() => alert('Global Lending Guardrails updated successfully.')}>Save Policy Changes</button>
                    </div>
                </div>
                <div className="dash-card">
                    <h3>Pricing & Interest Engine</h3>
                    <p className="text-muted">Dynamic rates based on pricing ladders</p>
                    <div className="pricing-ladder">
                        {[
                            { range: 'Score > 80', rate: '7.2%' },
                            { range: 'Score 70-80', rate: '8.5%' },
                            { range: 'Score 60-70', rate: '9.8%' },
                            { range: 'Score < 60', rate: 'Manual' },
                        ].map((row, i) => (
                            <div key={i} className="ladder-row-interactive">
                                <span>{row.range}</span>
                                <input type="text" defaultValue={row.rate} className="mini-input" />
                            </div>
                        ))}
                    </div>
                    <button className="btn-outline btn-full" onClick={() => alert('Pricing updated bank-wide.')}>Update Pricing Board</button>
                </div>
            </div>

            <div className="dash-card" style={{ marginTop: '2rem' }}>
                <h3>Approval Workflow Hierarchy</h3>
                <div className="workflow-steps">
                    <div className="workflow-step">
                        <span className="step-num">1</span>
                        <strong>Relationship Manager</strong>
                        <p>Recommendation & KYC</p>
                    </div>
                    <ChevronRight size={18} />
                    <div className="workflow-step">
                        <span className="step-num">2</span>
                        <strong>Branch Head</strong>
                        <p>Due Diligence Review</p>
                    </div>
                    <ChevronRight size={18} />
                    <div className="workflow-step">
                        <span className="step-num">3</span>
                        <strong>Risk Dept.</strong>
                        <p>Credit Risk Assessment</p>
                    </div>
                    <ChevronRight size={18} />
                    <div className="workflow-step highlight">
                        <span className="step-num">4</span>
                        <strong>HQ Direct</strong>
                        <p>Final Sanction ({'>'} 25L)</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function AdminConsoleSection() {
    return (
        <motion.div initial="hidden" animate="visible" exit="hidden" variants={fadeIn}>
            <div className="admin-dash__grid">
                <div className="dash-card">
                    <div className="dash-card__header">
                        <h3>Enterprise Authentication</h3>
                        <Fingerprint size={20} />
                    </div>
                    <div className="auth-settings">
                        <div className="setting-row">
                            <span>OAuth / SAML Integration</span>
                            <span className="status-pill status-pill--active">Okta / Azure AD</span>
                        </div>
                        <div className="setting-row">
                            <span>SSO Status</span>
                            <span className="status-pill status-pill--active">Operational</span>
                        </div>
                        <div className="setting-row">
                            <span>Multi-Factor (Biometric)</span>
                            <button className="btn-text" onClick={() => alert('Opening MFA Device Management...')}>Enabled</button>
                        </div>
                    </div>
                </div>
                <div className="dash-card">
                    <div className="dash-card__header">
                        <h3>Core Banking Integration (CBS)</h3>
                        <Landmark size={20} />
                    </div>
                    <div className="cbs-settings">
                        <div className="cbs-type">
                            <label>Selected CBS Provider</label>
                            <strong>Infosys Finacle v11.x</strong>
                        </div>
                        <div className="sync-status">
                            <Activity size={14} className="text-success" />
                            <span>Last Real-time Sync: 2 mins ago</span>
                        </div>
                        <div className="integration-links">
                            <span>Loan Origination (LOS)</span>
                            <span>Credit Bureau (CIBIL)</span>
                            <span>DMS (Digitization)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dash-card" style={{ marginTop: '2rem' }}>
                <div className="dash-card__header">
                    <h3>Platform Admin Console</h3>
                    <div className="system-health">
                        <Activity size={14} className="text-success" />
                        <span>SLA: 99.98% Available</span>
                    </div>
                </div>
                <div className="admin-ops">
                    <div className="op-item">
                        <Scale />
                        <div>
                            <h4>Dynamic Branding</h4>
                            <p>Manage Bank logo, color palette, and white-labeling.</p>
                        </div>
                        <button className="btn-minimal-posh" onClick={() => alert('Launching Visual Brand Customizer...')}>Edit Branding</button>
                    </div>
                    <div className="op-item">
                        <Database />
                        <div>
                            <h4>Bulk Portfolio Operations</h4>
                            <p>Excel Mass-Import / Re-scoring for 100k+ accounts.</p>
                        </div>
                        <button className="btn-minimal-posh--primary btn-minimal-posh" onClick={() => alert('Initializing Bulk Data Pipeline...')}>Launch Module</button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
