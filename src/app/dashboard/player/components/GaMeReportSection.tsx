'use client'

import { FileText, Eye, Plus, CheckCircle, Clock } from 'lucide-react'

import { SHARED_REPORTS_DATA } from "@/lib/constants/reports";

export default function GameReportSection() {
  const reports = SHARED_REPORTS_DATA;

  return (
    <div className="py-20">
      <div className="container">
        {/* Main Card */}
        <div className="border rounded-2xl p-8 ">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading text-white mb-1">Game Reports</h1>
              <p className="text-gray-400 text-sm">Professional match analysis</p>
            </div>
            <button className="px-4 py-2 border  text-white rounded-lg hover:border-gray-400 transition flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Report
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-4 text-left text-sm font-semibold text-white">Report</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-white">Rating</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-white">Amount</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-white">Date</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-white">View</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-700 hover:bg-gray-800 hover:bg-opacity-50 transition">
                    <td className="px-4 py-6 text-sm">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-red-600 shrink-0" />
                        <span className="text-red-600 font-semibold">vs {report.team2}</span>
                      </div>
                    </td>
                    <td className="px-4 py-6 text-sm text-gray-300">{report.rating}</td>
                    <td className="px-4 py-6 text-sm text-gray-300">{report.amount}</td>
                    <td className="px-4 py-6 text-sm text-gray-300">{report.date}</td>
                    <td className="px-4 py-6 text-sm">
                      <div className="flex items-center gap-2">
                        {report.status === 'Paid' ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-green-500 font-semibold">Paid</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4 text-orange-500" />
                            <span className="text-orange-500 font-semibold">Pending</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-6 text-sm">
                      <Eye className="w-5 h-5 text-red-600 hover:text-red-500 cursor-pointer transition" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
