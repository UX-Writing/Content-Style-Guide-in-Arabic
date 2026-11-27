{{- /* One page as Markdown, with a link back to the web page */ -}}
{{ .RawContent | strings.TrimSpace }}

---

المصدر: {{ .Permalink }}
{{ with .Lastmod }}آخر تحديث: {{ .Format "2006-01-02" }}
{{ end -}}
