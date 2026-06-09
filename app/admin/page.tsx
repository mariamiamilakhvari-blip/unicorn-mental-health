'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Trash2, Pencil, Check, X, Users, ImageIcon, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

type User = {
  _id: string
  name: string
  email: string
  role: 'user' | 'admin'
  provider: string
  onboardingCompleted: boolean
  subscription?: { plan: string; status: string }
  createdAt: string
  image?: string
}

type Upload = {
  public_id: string
  secure_url: string
  created_at: string
  bytes: number
  width: number
  height: number
}

type EditingUser = { name: string; email: string; role: 'user' | 'admin' }

export default function AdminPage() {
  const [tab, setTab] = useState<'users' | 'uploads'>('users')
  const [users, setUsers] = useState<User[]>([])
  const [uploads, setUploads] = useState<Upload[]>([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<EditingUser>({ name: '', email: '', role: 'user' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (tab === 'users') loadUsers()
    else loadUploads()
  }, [tab])

  async function loadUsers() {
    setLoading(true)
    const res = await fetch('/api/admin/users')
    const data = await res.json()
    setUsers(data.users ?? [])
    setLoading(false)
  }

  async function loadUploads() {
    setLoading(true)
    const res = await fetch('/api/admin/uploads')
    const data = await res.json()
    setUploads(data.resources ?? [])
    setLoading(false)
  }

  function startEdit(user: User) {
    setEditingId(user._id)
    setEditForm({ name: user.name, email: user.email, role: user.role })
  }

  async function saveUser() {
    if (!editingId) return
    setSaving(true)
    const res = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingId, ...editForm }),
    })
    const data = await res.json()
    if (data.user) {
      setUsers(prev => prev.map(u => u._id === editingId ? { ...u, ...data.user } : u))
    }
    setEditingId(null)
    setSaving(false)
  }

  async function deleteUser(id: string) {
    if (!confirm('Delete this user? This cannot be undone.')) return
    await fetch('/api/admin/users', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setUsers(prev => prev.filter(u => u._id !== id))
  }

  async function deleteUpload(publicId: string) {
    if (!confirm('Delete this image from Cloudinary?')) return
    await fetch('/api/admin/uploads', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ publicId }) })
    setUploads(prev => prev.filter(u => u.public_id !== publicId))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-velvet-500 flex items-center justify-center">
          <ShieldCheck className="h-4 w-4 text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-8">
          <button
            onClick={() => setTab('users')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === 'users' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Users className="h-4 w-4" />
            Users
            {users.length > 0 && <span className="bg-velvet-100 text-velvet-700 text-xs px-1.5 py-0.5 rounded-full">{users.length}</span>}
          </button>
          <button
            onClick={() => setTab('uploads')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === 'uploads' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <ImageIcon className="h-4 w-4" />
            Uploads
            {uploads.length > 0 && <span className="bg-velvet-100 text-velvet-700 text-xs px-1.5 py-0.5 rounded-full">{uploads.length}</span>}
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-velvet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Users Table */}
        {!loading && tab === 'users' && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">User</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Role</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Provider</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Plan</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Joined</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        {editingId === user._id ? (
                          <div className="flex flex-col gap-1.5">
                            <input
                              className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm w-44 focus:outline-none focus:ring-2 focus:ring-velvet-300"
                              value={editForm.name}
                              onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                              placeholder="Name"
                            />
                            <input
                              className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm w-44 focus:outline-none focus:ring-2 focus:ring-velvet-300"
                              value={editForm.email}
                              onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
                              placeholder="Email"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            {user.image ? (
                              <Image src={user.image} alt={user.name} width={32} height={32} className="rounded-full object-cover" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-velvet-300 to-velvet-500 flex items-center justify-center text-white text-xs font-bold">
                                {user.name?.[0]?.toUpperCase()}
                              </div>
                            )}
                            <div>
                              <div className="font-medium text-gray-900">{user.name}</div>
                              <div className="text-gray-400 text-xs">{user.email}</div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {editingId === user._id ? (
                          <select
                            className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-velvet-300"
                            value={editForm.role}
                            onChange={e => setEditForm(f => ({ ...f, role: e.target.value as 'user' | 'admin' }))}
                          >
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                          </select>
                        ) : (
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${user.role === 'admin' ? 'bg-velvet-100 text-velvet-700' : 'bg-gray-100 text-gray-500'}`}>
                            {user.role ?? 'user'}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-500 capitalize">{user.provider}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-500">{user.subscription?.plan ?? '—'}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          {editingId === user._id ? (
                            <>
                              <button onClick={saveUser} disabled={saving} className="p-1.5 rounded-lg hover:bg-sage-50 text-sage-600 transition-colors">
                                <Check className="h-4 w-4" />
                              </button>
                              <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => startEdit(user)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button onClick={() => deleteUser(user._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">No users found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Uploads Grid */}
        {!loading && tab === 'uploads' && (
          <div>
            {uploads.length === 0 ? (
              <div className="text-center py-20 text-gray-400">No uploads found in unicorn-avatars folder</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {uploads.map(upload => (
                  <div key={upload.public_id} className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="relative aspect-square">
                      <Image src={upload.secure_url} alt={upload.public_id} fill className="object-cover" />
                      <button
                        onClick={() => deleteUpload(upload.public_id)}
                        className="absolute top-1.5 right-1.5 w-7 h-7 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="px-2 py-1.5">
                      <p className="text-xs text-gray-400 truncate">{upload.public_id.split('/').pop()}</p>
                      <p className="text-xs text-gray-300">{(upload.bytes / 1024).toFixed(0)}KB · {upload.width}×{upload.height}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
